// This code is for my meal generator tab 
// It also uses the custom angular service "UtilsService" to disply cooking times for generated recipes
import { Component} from '@angular/core';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage {
  recipes: any[] = [
    {
      name: "Scrambled Eggs",
      type: "breakfast",
      instructions: `1. Crack eggs into a bowl...\n2. Whisk the eggs...\n3. Heat a non-stick skillet over medium heat...\n\n` +
                    `Cooking Time: {{ formatCookingTime(5) }}`, // Using formatCookingTime from UtilsService
      cookingTimeInMinutes: 5 // Assuming 5 minutes cooking time for demonstration
    },
    { name: "French Toast", type: "breakfast", instructions: "..." },
    { name: "Avocado Toast", type: "breakfast", instructions: "..." },
    { name: "Omelette", type: "breakfast", instructions: "..." },
    { name: "Pancakes", type: "breakfast", instructions: "..." },
    { name: "Bacon and Eggs", type: "breakfast", instructions: "..." },
    { name: "Breakfast Burrito", type: "breakfast", instructions: "..." },
    { name: "Granola Parfait", type: "breakfast", instructions: "..." },
    { name: "Fruit Smoothie", type: "breakfast", instructions: "..." },
    { name: "Veggie Wrap", type: "lunch", instructions: "..." },
    { name: "Chicken Salad", type: "lunch", instructions: "..." },
    { name: "Caesar Salad", type: "lunch", instructions: "..." },
    { name: "Greek Salad", type: "lunch", instructions: "..." },
    { name: "Cobb Salad", type: "lunch", instructions: "..." },
    { name: "Spaghetti Carbonara", type: "dinner", instructions: "..." },
    { name: "Chicken Alfredo", type: "dinner", instructions: "..." },
    { name: "Beef Stir-Fry", type: "dinner", instructions: "..." },
    { name: "Baked Ziti", type: "dinner", instructions: "..." },
    { name: "Tacos", type: "dinner", instructions: "..." },
    { name: "Burritos", type: "dinner", instructions: "..." },
    { name: "Fajitas", type: "dinner", instructions: "..." },
    { name: "Grilled Salmon", type: "dinner", instructions: "..." },
    { name: "Baked Chicken", type: "dinner", instructions: "..." },
    { name: "Roast Beef", type: "dinner", instructions: "..." },
  ];
  constructor(private utilsService: UtilsService) {} // Inject UtilsService
  formatCookingTime(cookingTimeInMinutes: number): string {
    return this.utilsService.formatCookingTime(cookingTimeInMinutes); // Use UtilsService
  }
  filteredRecipes: any[] = [];
  generatedRecipe: any = null;
  selectedType: string | null = null;

  generateRecipe() {
    if (this.selectedType && this.selectedType !== 'all') { // Adjusted condition
      const filteredByType = this.recipes.filter(recipe => recipe.type === this.selectedType);
      const randomIndex = Math.floor(Math.random() * filteredByType.length);
      this.filteredRecipes = filteredByType;
      this.generatedRecipe = filteredByType[randomIndex];
    } else {
      const randomIndex = Math.floor(Math.random() * this.recipes.length);
      this.filteredRecipes = this.recipes;
      this.generatedRecipe = this.recipes[randomIndex];
    }
  }
}