const myPassword =()=>{
   let PassWord="";
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let strLen= str.length;
    for (var i=0; i<=7; i++){
        let mynum=Math.floor(Math.random()*strLen);
        PassWord+=str.charAt(mynum);
    }

    return PassWord;
}

module.exports={
    myPassword
}