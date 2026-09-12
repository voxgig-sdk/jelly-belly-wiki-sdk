import { JellyBellyWikiEntityBase } from '../JellyBellyWikiEntityBase';
import type { JellyBellyWikiSDK } from '../JellyBellyWikiSDK';
import type { Control } from '../types';
import type { Bean, BeanLoadMatch, BeanListMatch } from '../JellyBellyWikiTypes';
declare class BeanEntity extends JellyBellyWikiEntityBase<Bean> {
    constructor(client: JellyBellyWikiSDK, entopts: any);
    make(this: BeanEntity): BeanEntity;
    load(this: any, reqmatch?: BeanLoadMatch, ctrl?: Control): Promise<BeanEntity>;
    list(this: any, reqmatch?: BeanListMatch, ctrl?: Control): Promise<BeanEntity[]>;
}
export { BeanEntity };
