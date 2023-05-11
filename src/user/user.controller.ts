import { Body, Controller, Get, Param, Post, Put, Patch, Delete, NotFoundException, UseInterceptors,UploadedFile, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Meeting, Product, User } from 'src/user/typeorm';
import { diskStorage } from 'multer';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { CreateProductDto } from './dto/product.dto';
import { CreateMeetingDto } from './dto/meeting.dto';

@Controller('userPostgres')
export class UserController {
    
    constructor(private readonly userService: UserService) {}

/*get started */
    @Get()
    getHello(): string {
        console.log('Hello World!')
        return this.userService.getHello();
    }

/*Add user to database */
    @Post('/addUser')
    async saveUser(@Body() createuserdto:CreateUserDto[]):Promise<User[]>{
        return await this.userService.createUser(createuserdto);
    }

/*Get the all users present in databse */
    @Get('allUsers')
    async getAll():Promise<User[]>{
        const allUsers= await this.userService.findAll();
        console.log(allUsers);
        return allUsers;
    }

/*Get the user by theire :id */
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
        const user = await this.userService.findById(id);
        if (!user) {
            throw new NotFoundException('User does not exist!');
        }
        else {
            return user;
        }
    }
    // get the user by CreateQueryBuilder //
    @Get('/byId/:id')
    async findByIdUserTryout(@Param('id') id: number) {
        const user = await this.userService.findByIdUserTryout(id);
        if (!user) {
            throw new NotFoundException('User does not exist!');
        }
        else {
            return user;
        }
    }

/*Update the password for all the user as encrypted form */
    @Put('/updateUser')
    async update(@Body('password') password:string): Promise<any> {
      return await this.userService.updateAsEncryptPass(password);
    }

/*Reset the password by theire id compares with oldpass if it matches then new password */
    @Patch('/resetPassword/:id')
    async resetPassword(@Param('id') id: number,@Body()password:string ,@Body() req:{oldPassword:string,newPassword:string}): Promise<any> {
    console.log('req',req)
    const user = await this.userService.findById(id);
        if (!user) {
            return `User with ID ${id} not found`;    
        }
        const updatedUser = await this.userService.updatePassword(id,req.oldPassword,req.newPassword,password);
        if (!updatedUser) {
            return 'Failed to update user password';
        }
        return `Password updated successfully for user id ${id}`;
    }

/*Upload a profile picture to user by theire id */
    @Post('uploadProfile/:id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/profilepictures',
            filename:(req, file, cb)=>{
                const randomName = uuidv4();
                const fileExtension = extname(file.originalname);
                cb(null, `${randomName}${fileExtension}`);
            }
        })
    }))
    async uploadProfilePicture(@Param('id') id:number, @UploadedFile() file) {
        //console.log(file);
        const user= await this.userService.findById(id);
        if(!user){
            throw new NotFoundException('User Not Present')
        }
        //filename taken as uuid
        const randomName = uuidv4();
        const fileExtension = extname(file.originalname);
        const filenametostore= `${randomName}${fileExtension}`;
        console.log(`user with id : ${id} is updated with profile picture as: ${filenametostore}`)
        user.profilepicture = filenametostore;
        const picUpload = await this.userService.profilePicUpdate(user);
        return `profile pic updated for user of id: ${id}`;
    }

/*Create access_token for user by theire emailid */
    @Post('/login')
    async login(@Body() emailid:string) {
        return await this.userService.findOne(emailid);
    }

/*Delete user by theire id */
    @Delete('/deleteUser/:id')
    async deleteUser(@Param('id') id:number): Promise<any>{
        const user = await this.userService.findById(id);
        if (!user) {
            throw new NotFoundException('User Not Exists!');
        }
        const deleteUser= this.userService.deleteUser(id);
        return deleteUser;
    }


/*Product Entity added and created product */
    @Post('/addProduct')
    async addProduct(@Body() createproductdto:CreateProductDto[]): Promise<Product[]>{
        return await this.userService.createProduct(createproductdto)
    }

/*Get the product by theire id */
    @Get('/getProd/:id')
    async getProductById(@Param('id') id: number): Promise<Product> {
        const product = await this.userService.getProduct(id);
        if (!product) {
            throw new NotFoundException('product does not exist!');
        }
        else {
            return product;
        }
    }

/*Get the All Products */
    @Get('/prod/allProducts')
    async getAllProducts():Promise<Product[]>{
        const allProducts= await this.userService.findAllProducts();
        console.log(allProducts);
        return allProducts;
    }

/*Meeting entity added and created a meeting*/
/*Upload a file to meeting with same api*/
    @Post('/createMeeting')
    @UseInterceptors(FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads/uploadFile',
                filename:(req, file, callback)=>{
                    const randomName = uuidv4();
                    const fileExt = extname(file.originalname);
                    callback(null, `${randomName}${fileExt}`);
                }
            })
        }))
        
    async createMeeting(@Body() meeting:Meeting, @UploadedFile() file):Promise<Meeting> {
        const randomName= uuidv4();
        const fileExt = extname(file.originalname);
        const filenametostore= `${randomName}${fileExt}`;
        if(file){
            meeting.uploadfile = filenametostore;
        }
        console.log(file);
        return await this.userService.createMeeting(meeting);
    }

/*Get the meeting by theire id */
    @Get('/getMeet/:id')
    async getMeetById(@Param('id')id:number):Promise<Meeting>{
        const meet= await this.userService.findMeetById(id);
        return meet;
    }

}
