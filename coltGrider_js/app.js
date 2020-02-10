// DOUBLE EQUALS

//Checks for equality of value, but not equality of type
//It coerces(tranforms) both values to the same type and then compares them
//This can lead to some expected results!

5 == 5;     //true
'b' == 'c'  // false
7 == '7'    //true
0 == '';    //true
true == false; // false
0 == false;     //true
null == undefined;  //true