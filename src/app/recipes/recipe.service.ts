import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    recipesChanges = new Subject<Recipe[]>();

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanges.next(this.recipes.slice());
    }

    private recipes: Recipe[] = [
        new Recipe(
        "Test Recipe 1",
        "Test Description",
        "https://atmedia.imgix.net/49857603ba4434ed65523956d5644f63a84d531f?w=800&fit=max",
        [
            new Ingredient('Pepperoni', 10),
            new Ingredient('Cheese', 5)
        ]
        ),
        new Recipe(
        "Test Recipe 2",
        "Test Description",
        "https://atmedia.imgix.net/49857603ba4434ed65523956d5644f63a84d531f?w=800&fit=max",
        [
            new Ingredient('Sausage', 10),
            new Ingredient('Maranara', 5)
        ]
        ),
        new Recipe(
        "Test Recipe 3",
        "Test Description",
        "https://atmedia.imgix.net/49857603ba4434ed65523956d5644f63a84d531f?w=800&fit=max",
        [
            new Ingredient('Onion', 10),
            new Ingredient('Garlic', 5)
        ]
        )
  ];

  constructor(private shoppingService: ShoppingListService) { }

  getRecipes() {
      return this.recipes.slice();
  }

  getRecipe(id: number) {
      return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanges.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanges.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanges.next(this.recipes.slice());
  }
}