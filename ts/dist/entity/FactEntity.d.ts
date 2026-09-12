import { JellyBellyWikiEntityBase } from '../JellyBellyWikiEntityBase';
import type { JellyBellyWikiSDK } from '../JellyBellyWikiSDK';
import type { Control } from '../types';
import type { Fact, FactListMatch } from '../JellyBellyWikiTypes';
declare class FactEntity extends JellyBellyWikiEntityBase<Fact> {
    constructor(client: JellyBellyWikiSDK, entopts: any);
    make(this: FactEntity): FactEntity;
    list(this: any, reqmatch?: FactListMatch, ctrl?: Control): Promise<FactEntity[]>;
}
export { FactEntity };
