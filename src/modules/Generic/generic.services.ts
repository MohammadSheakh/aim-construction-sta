import { PaginateOptions } from "../../types/paginate";

export class GenericService <T> {
    model : any; // FIXME : fix type .. 

    constructor(model: any /** //FIXME : fix type */){
        this.model = model;
    }

    async create(data : T){
        console.log("req.body 🧪🧪", data);
        return await this.model.create(data);
    }

    async getAll(){
        // pagination er jonno fix korte hobe .. 
        return await this.model.find();
    }

    async getAllWithPagination(
        filters: any, // Partial<INotification> // FixMe : fix type 
        options: PaginateOptions){
            const result = await this.model.paginate(filters, options);
            return result;
    }

    async getById(id : string){
        return await this.model.findById(id);
    }

    async updateById(id: string, data: T) {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteById(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}