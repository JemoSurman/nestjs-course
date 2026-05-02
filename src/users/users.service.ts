export class UsersService{
    users: {id: Number, name: string, email: string, gender: string, isMarried: boolean}[] = [
        {id: 1, name: 'John', email: 'john@gmal.com', gender: 'male', isMarried: false},
        {id: 2, name: 'Jane', email: 'jane@gmail.com', gender: 'female', isMarried: true},
        {id: 3, name: 'Dave', email: 'dave@gmail.com', gender: 'male', isMarried: true},
    ]

    getAllUsers(){
        return this.users;
    }

    getUsersById(id: Number){
        return this.users.find(x => x.id === id);
    }

    createUser(user: {id: Number, name: string, email: string, gender: string, isMarried: boolean}){
        this.users.push(user);
    }
    
}