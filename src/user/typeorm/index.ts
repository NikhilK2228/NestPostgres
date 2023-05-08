import { Meeting } from "./meeting.entity";
import { Product } from "./product.entity";
import { User } from "./user.entity";

const entities = [User,Product, Meeting];

export {User, Product, Meeting};

/*This index.ts file is created for the entities used in app.module. Entity(Table) will create(in database) only when we add here. And then entities will be exported to app.module*/
export default entities;