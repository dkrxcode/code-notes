struct MyStruct {

}

// Add methods to struct
// Can be defined in any file, even if you do not own it
impl MyStruct {

}

// Implement trait methods for struct
impl MyTrait for MyStruct {

}

// New constructor
// Self (capitalized) is a reference to the self type
impl MyStruct {
  pub fn new(foo, bar) -> Self {
    Self {

    }
  }
}


// Initialize struct
let myStruct = MyStruct {

}

// Options are just an Enum of None and Some<T>

//////////////////////////////
// ENUMs
//////////////////////////////

// Acts like a union type so can have vairiants 
// Can hold structs
pub enum MyEnum {
  Empty,
  MyStructEnum(MyStruct)
}

// Add methods to enums
impl MyEnum {

}