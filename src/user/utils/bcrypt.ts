import * as bcrypt from 'bcrypt';

export function encodePassword(randomPassword:string){
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(randomPassword, SALT);
}

export async function comparePassword(oldpass: string , savedPassword:string):Promise<boolean> {
    console.log(oldpass , savedPassword);
    
    const saltRounds = 10;
    const salt = await  bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(oldpass, salt);
    console.log(salt);
    console.log(hash);

    const isMatch =  bcrypt.compare( oldpass , savedPassword);
    return isMatch;
  }