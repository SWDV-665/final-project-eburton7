// This is the code for my grocery list tab
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  apiUrl = 'http://localhost:3000/api/mealplanner';
  groceryItems: string[] = [];

  newItem: string = '';

  constructor(
    private platform: Platform,
    private alertController: AlertController,
    private http: HttpClient,
    private sqlite: SQLite,
    private sqlitePorter: SQLitePorter,
    private nativeStorage: NativeStorage
  ) {
    this.loadGroceryItems();
    this.initDatabase();
    this.fetchGroceryItems();
  }
  loadGroceryItems() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (response) => {
        if (response) {
          this.groceryItems = response.map((item) => item.name);
        }
      },
      (error) => {
        console.error('Error fetching grocery items:', error);
      }
    )
  }
  
  async initDatabase() {
    try {
    } catch (error) {
      console.error('Error opening database', error);
    }
  }

  async fetchGroceryItems() {
    try {
      const response = await this.http.get<any[]>(this.apiUrl).toPromise();
      
      if (response && Array.isArray(response)) {
        this.groceryItems = response.map(item => item.name);
    
        this.nativeStorage.setItem('groceryItems', this.groceryItems).then(
          () => {},
          (error) => {
            console.error('Error storing grocery items in Native Storage', error);
          }
        );
      }
    } catch (error) {
      console.error('Error fetching grocery items from API', error);
    }
  }
  // Add a grocery list item
  async addItem() {
    if (this.newItem.trim() !== '') {
      try {

        this.groceryItems.push(this.newItem.trim());
        this.newItem = '';

        this.nativeStorage.setItem('groceryItems', this.groceryItems).then(
          () => {},
          (error) => {
            console.error('Error storing grocery items in Native Storage', error);
          }
        );
      } catch (error) {
        console.error('Error inserting item into database', error);
      }
    }
  }
// Delete a grocery list item
  async deleteItem(item: string) {
    try {
      if (this.platform.is('cordova')) {
        const confirmResult = await this.showDeleteConfirmation();
  
        if (confirmResult) {
          const index = this.groceryItems.indexOf(item);
          if (index !== -1) {
            this.groceryItems.splice(index, 1); // Remove the item from the array
          }
  
          this.nativeStorage.setItem('groceryItems', this.groceryItems).then(
            () => {},
            (error) => {
              console.error('Error storing grocery items in Native Storage', error);
            }
          );
        }
      } else {
        const index = this.groceryItems.indexOf(item);
        if (index !== -1) {
          this.groceryItems.splice(index, 1); // Remove the item from the array
        }
      }
    } catch (error) {
      console.error('Error deleting item', error);
    }
  }

// If using the cordova plugin
  async showDeleteConfirmation(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirm Delete',
        message: 'Are you sure you want to delete this item?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              resolve(false);
            },
          },
          {
            text: 'OK',
            handler: () => {
              resolve(true);
            },
          },
        ],
      });

      await alert.present();
    });
  }
}