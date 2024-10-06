import Category from "#models/category"
import { category } from "../../constants/enum.js"

interface AddCategory {
    name: string
    type: category
}

export class CategoryService {
    static async add(payload: AddCategory, user: number) {
        const category = await Category.create({
            name: payload.name,
            type: payload.type,
            created_by: user
        });
        return {
            ...category.serializeAttributes(),
            created_by: undefined,
            updated_by: undefined,
            deleted_by: undefined,
            created_at: undefined,
            updated_at: undefined,
            deleted_at: undefined,
        }
    }

    static async get() {
        
    }
}