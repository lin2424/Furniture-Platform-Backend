
export interface IdCheckRes {
    index: number,
    entities: any[]
}

export class MKController {
    public static async checkIdExist(ids: number[], repo: any): Promise<IdCheckRes> {
        let index = 0;
        let entities = [];
        let result: IdCheckRes = {index: -1, entities};

        for (index; index < ids.length; index++) {
            try {
                let entity = await repo.findOneOrFail(ids[index]);
                result.entities.push(entity);
            } catch(e) {
                break;
            }
        }

        if (index === ids.length) {
            result.index = -1;
        } else {
            result.index = ids[index];
        }

        return result;

    }

    public static async checkSingleIdExist(id: string | number, repo: any): Promise<IdCheckRes> {
        let index = 0;
        let entities = [];
        let result: IdCheckRes = {index: -1, entities};

        try {
            let entity = await repo.findOneOrFail({where : {id}});
            result.entities.push(entity); 
            index = -1;
        } catch(e) {
            result.index = 0;
        }

        return result; 
    }

}