import { BeanEntity } from './entity/BeanEntity';
import { CombinationEntity } from './entity/CombinationEntity';
import { FactEntity } from './entity/FactEntity';
import { HistoryEntity } from './entity/HistoryEntity';
import { RecipeEntity } from './entity/RecipeEntity';
export type * from './JellyBellyWikiTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { JellyBellyWikiEntityBase } from './JellyBellyWikiEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class JellyBellyWikiSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Bean(entopts?: Record<string, any>): BeanEntity;
    Combination(entopts?: Record<string, any>): CombinationEntity;
    Fact(entopts?: Record<string, any>): FactEntity;
    History(entopts?: Record<string, any>): HistoryEntity;
    Recipe(entopts?: Record<string, any>): RecipeEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): JellyBellyWikiSDK;
    tester(testopts?: any, sdkopts?: any): JellyBellyWikiSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof JellyBellyWikiSDK;
export { stdutil, config, BaseFeature, JellyBellyWikiEntityBase, JellyBellyWikiSDK, SDK, };
