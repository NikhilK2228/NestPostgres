import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting, User } from 'src/user/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { comparePassword, encodePassword } from './utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Product } from './typeorm/product.entity';
import { CreateProductDto } from './dto/product.dto';
import { CreateMeetingDto } from './dto/meeting.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(Meeting) private readonly meetingRepository: Repository<Meeting>,
        private readonly jwtService: JwtService
    ) {}

/*get started */
    getHello(): string {
        return 'Hello World!';
    }

/*Add user to database */
    createUser(createuserdto:CreateUserDto[]) :Promise<User[]>{
        const newUser = this.userRepository.create(createuserdto);
        return this.userRepository.save(newUser);
    }

/*Get the all users present in databse */
    async findAll(){
        return await this.userRepository.find();
    }

/*Get the user by theire :id */
    async findById(id: number): Promise<User> {
        return await this.userRepository.findOne({ where: { id } });
    }

    // get the user by CreateQueryBuilder //
    async findByIdUserTryout(id:number){
        const queryResult = await this.userRepository
            .createQueryBuilder("user")
            .where("user.id = :user_id", { user_id : id })
            .getOne();
        console.log(queryResult);
        return queryResult;
    }

/*Update the password for all the user as encrypted form */
    async updateAsEncryptPass(password: string): Promise<any> {
        const encrypPass = encodePassword(password);
        console.log(encrypPass);
        const updateduser= await this.userRepository
            .createQueryBuilder()
            .update(User)
            .set({password:encrypPass})
            .execute();
            console.log(updateduser);
        return updateduser;
    }

/*Reset the password by theire id compares with oldpass if it matches then new password */
    async updatePassword(id: number, oldPassword: string, newPassword: string, savedPassword: string): Promise<any> {
        const isValidPass = comparePassword(oldPassword, savedPassword);
        if (!isValidPass) {
          console.log('This is not a valid password');
        }
        let newpass = await encodePassword(newPassword);
        console.log("newpassword in encryptedform: " + newpass);
        return await this.userRepository
            .createQueryBuilder()
            .update(User)
            .where("id = :id", { id : id })
            .set({password:newpass}).execute();
    }

/*upload a profile picture to user by theire id */
    async profilePicUpdate(user:User):Promise<User>{
        return await this.userRepository.save(user);
    }

/*Create access_token for user by theire emailid */
    async findOne(emailid): Promise<any> {
        const user = await this.userRepository.findOneBy(emailid);
        if (!user) {
          console.log('This User Not Exists..')
          throw new NotFoundException('This User Not Exists..')
        }
        const payload = { 
            username: user.username, 
            emailid: user.emailid, 
            address:user.address 
        };
        const access_token = this.jwtService.sign(payload);
        console.log("Access_Token: "  +access_token);
        return {
            access_token
        };
    }

/*Delete user by theire id */
    async deleteUser(id: number): Promise<any> {
        return await this.userRepository.delete(id);
    }


/*Product Entity added and created product */
    async createProduct(createproductdto:CreateProductDto[]): Promise<Product[]>{
        const newProduct = this.productRepository.create(createproductdto);
        return await this.productRepository.save(newProduct);
    }

/*Get the product by theire id */
    async getProduct(id:number):Promise<Product>{
        return await this.productRepository.findOne({ where : {id} });
    }
    
/*Get the All Products */
    async findAllProducts():Promise<Product[]>{
        return await this.productRepository.find();
    }


/*Meeting entity added and created a meeting*/
    async createMeet(createmeetdto:CreateMeetingDto[]):Promise<Meeting[]>{
        const createMeet = this.meetingRepository.create(createmeetdto);
        return await this.meetingRepository.save(createMeet)
    }

/*Upload a file to meeting by theire id */
    async findMeetById(id: number): Promise<Meeting> {
        const meet= await this.meetingRepository.findOne({ where: { id } });
        return meet;
    }
    async uploadMeetFile(meeting:Meeting):Promise<Meeting>{
        return await this.meetingRepository.save(meeting);
    }
    

}
