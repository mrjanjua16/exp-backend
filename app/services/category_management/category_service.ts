import Category from "#models/category"
import { DateTime } from "luxon";
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

    static async list() {
        const categories = await Category.query().whereNull('deleted_by');
        return categories.map(category => category.serializeAttributes())
    }

    static async update(categoryId: number, payload: AddCategory, userId: number ) {
        const category = await Category.find(categoryId);
        if (!category) {
            return { error: { status: 404, message: 'Category not found.'} };
        } else if (category.deleted_by !== null || category.deleted_at !==null) {
            return { error: { message: 'Category not found.'} };
        } else {
            category.merge(payload);
            category.updated_by = userId;
            const updated_category = await category.save();
            return updated_category;
        }
    }

    static async delete(categoryId: number, userId: number) {
        const category = await Category.find(categoryId);
        if (category) {
            {
                if (category.deleted_by !== null) {
                    return { error: { status: 404, message: "Category is already deleted." } }
                } else {
                    category.deleted_by = userId;
                    category.deleted_at = DateTime.now();
                    await category.save();
                    return {message: 'Category has been deleted.'}
                }
            }
        } else {
            return { error: { status: 404, message: "Category not found."} }
        }
    }

}