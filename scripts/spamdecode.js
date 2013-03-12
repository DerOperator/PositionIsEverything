function mailMe(sDom, Usertwo, Userone){
  return("mail"+"to:"+Userone+Usertwo+"@"+sDom.replace(/%23/g,"."));
}
