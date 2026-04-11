export class UsersService{
    users: {id: number, name: string, age: number, gender: string, isMarried: boolean}[] = [
        {id: 1, name: 'john', age: 20, gender: 'male', isMarried: false},
        {id: 2, name: 'jane', age: 27, gender: 'female', isMarried: true}
    ]

    getAllUsers(){
        return this.users;
    }

    getUsersById(id: number){
        return this.users.find(x => x.id === id);
    }

    createUser(user: {id: number, name: string, age: number, gender: string, isMarried: boolean}){
        this.users.push(user);
    }
    
}