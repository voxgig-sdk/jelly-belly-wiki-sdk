import { JellyBellyWikiEntityBase } from '../JellyBellyWikiEntityBase';
import type { JellyBellyWikiSDK } from '../JellyBellyWikiSDK';
import type { Control } from '../types';
import type { Recipe, RecipeListMatch } from '../JellyBellyWikiTypes';
declare class RecipeEntity extends JellyBellyWikiEntityBase<Recipe> {
    constructor(client: JellyBellyWikiSDK, entopts: any);
    make(this: RecipeEntity): RecipeEntity;
    list(this: any, reqmatch?: RecipeListMatch, ctrl?: Control): Promise<RecipeEntity[]>;
}
export { RecipeEntity };
