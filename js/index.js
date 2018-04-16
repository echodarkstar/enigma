var rowc =250;  //Counter for left position
var topc = 0; //Counter for top position
var letters = "QWERTZUIO";  //String for first row
var letters2 = "ASDFGHJK";  // Second row string
var letters3= "PYXCVBNML";  //Third row string
var plain_text = "Plaintext - ";
var cipher_text = "Ciphertext - ";
//Rotors are basically objects. The crosswiring inside an Enigma rotor is the key-value mapping in an object.
var w = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var x =  "EKMFLGDQVZNTOWYHXUSPAIBRCJ";   // I
var y =  "AJDKSIRUXBLHWTMCQGZNPYFVOE";   // II
var z =  "BDFHJLCPRTXVZNYEIWGAKMUSQO";   // III
var ref = "YRUHQSLDPXNGOKMIEBFZCWVJAT";  //Reflector string

var alpha=w.split("");
var reflect = ref.split("");

var rotor1 = {};
var rotor2= {};
var rotor3 = {};
var reflector= {};

class Rotor{                                                 //Class that defines the rotor
  constructor(scrambler){
    this.letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.scrambler=scrambler;
    this.let_array=[];
    this.rot_array=[];
    this.notch="";
  }

  create_arrays(notch){
    this.let_array= this.letters.split("");
    this.rot_array= this.scrambler.split("");
    this.notch=notch;
  }

  rotate(){
    var first=this.let_array[0];
    this.let_array.splice(0,1);
    this.let_array.push(first);
 //   console.log(this.let_array);
  }

  set_rotor(a){
    while(this.let_array[0]!=a){
      this.rotate();
    }
  }
}

var Rotor_1 = new Rotor(x);
var Rotor_2 = new Rotor(y);
var Rotor_3= new Rotor(z);
Rotor_1.create_arrays("Q");
Rotor_2.create_arrays("E");
Rotor_3.create_arrays("V");
//console.log(Rotor_1.let_array);
//End rotor creation

var flag=0;
var obj={};
var a=[];
var clickv=0;   // This variable is to check if the keyboard has been clicked. If so, the plugboard is disabled.
var i=0;
var j=0;
var k=0;
//Lightboard rows
$('.prow1').children().each(function() {
  $(this).css({'left':rowc,'top':topc});
  $(this).html(letters.charAt(i));
  rowc+=80;
  i++;
});
rowc=300;
topc=topc+60;
$('.prow2').children().each(function() {
  $(this).css({'left':rowc,'top':topc});
  $(this).html(letters2.charAt(j));
  rowc+=80;
  j++;
});
rowc=250;
topc=topc+60;
$('.prow3').children().each(function() {
  $(this).css({'left':rowc,'top':topc});
  $(this).html(letters3.charAt(k));
  rowc+=80;
  k++;
});

//Re-Initialisation of values
rowc =250;
topc = 280;
i=0;
j=0;
k=0;
//Keyboard rows
$('.row1').children().each(function() {
  $(this).css({'left':rowc,'top':topc});
  $(this).html(letters.charAt(i));
  rowc+=80;
  i++;
});
rowc=300;
topc=topc+60;
$('.row2').children().each(function() {
  $(this).css({'left':rowc,'top':topc});
  $(this).html(letters2.charAt(j));
  rowc+=80;
  j++;
});
rowc=250;
topc=topc+60;
$('.row3').children().each(function() {
  $(this).css({'left':rowc,'top':topc});
  $(this).html(letters3.charAt(k));
  rowc+=80;
  k++;
});

//Re-Initialisation of values
var rowc =0;
var topc = 480;
var i=0;
var j=0;
var k=0;
//Plugboard rows
$('.plug1').children().each(function() {
  $(this).css({'left':rowc,'top':topc});
  $(this).html(letters.charAt(i));
  rowc+=80;
  i++;
});
rowc=300;
topc=topc+60;
$('.plug2').children().each(function() {
  $(this).css({'left':rowc,'top':topc});
  $(this).html(letters2.charAt(j));
  rowc+=80;
  j++;
});
rowc=250;
topc=topc+60;
$('.plug3').children().each(function() {
  $(this).css({'left':rowc,'top':topc});
  $(this).html(letters3.charAt(k));
  rowc+=80;
  k++;
});

$('#r1').click(function(){
  var boo= $('#I').val().toUpperCase();
  if(boo!="" || w.includes(boo)){
    Rotor_1.set_rotor(boo);
    $('#rotor1').html(Rotor_1.let_array[0]);
  }
  if(boo==null){
    Rotor_1.set_rotor('A');
    $('#rotor1').html(Rotor_1.let_array[0]);
  }
})
$('#r2').click(function(){
  var boo= $('#II').val().toUpperCase();
  if(boo!="" || w.includes(boo)){
    Rotor_2.set_rotor($('#II').val().toUpperCase());
    $('#rotor2').html(Rotor_2.let_array[0]);
  }
  if(boo==null){
    Rotor_2.set_rotor('A');
    $('#rotor2').html(Rotor_2.let_array[0]);
  }
})
$('#r3').click(function(){
  var boo= $('#III').val().toUpperCase();
  if(boo!="" || w.includes(boo)){
    Rotor_3.set_rotor($('#III').val().toUpperCase());
    $('#rotor3').html(Rotor_3.let_array[0]);
  }
  if(boo==null){
    Rotor_2.set_rotor('A');
    $('#rotor2').html(Rotor_2.let_array[0]);
  }
})

$('#rotor3').html(Rotor_3.let_array[0]);
$('#rotor2').html(Rotor_2.let_array[0]);
$('#rotor1').html(Rotor_1.let_array[0]);

//function to take input from button
$('.btn').not(".disabled, .btn-danger, .btn-reset, .btn-default, .btn-down").click(function(){
//  console.log(obj);
  var rott = false;
  var switchc = false;
  Rotor_3.rotate();
  if(Rotor_3.let_array[0]==Rotor_3.notch){
    Rotor_2.rotate();
    var rott= true;
  }
  if(Rotor_2.let_array[0]==Rotor_2.notch && rott){
    Rotor_1.rotate();
  }
  $('#rotor3').html(Rotor_3.let_array[0]);
  $('#rotor2').html(Rotor_2.let_array[0]);
  $('#rotor1').html(Rotor_1.let_array[0]);
  $.each(Rotor_1.rot_array,function(p,val){
    rotor1[Rotor_1.let_array[p]] = val;
  });
  $.each(Rotor_2.rot_array,function(p,val){
    rotor2[Rotor_2.let_array[p]] = val;
  });
  $.each(Rotor_3.rot_array,function(p,val){
    rotor3[Rotor_3.let_array[p]] = val;
  });
  $.each(reflect,function(p,val){
    reflector[alpha[p]] = val;
  });
//  console.log(rotor1);
//  console.log(rotor2);
  temp={};               //Creates a temporary object that holds the mapping between i/o of rotors
  ref_obj={};
  var key=0;

  function Gen(id,obj,temp){          // Creating function that maps characters between rotors
    if(switchc){
      for(var key2 in id){
        if (id.hasOwnProperty(key2)){
          if(obj[key]==id[key2]){
            temp[key]=key2;
            break;
          }
        }
       }
    }
    else{
      for(var key2 in id){
        if (id.hasOwnProperty(key2)){
          if(obj[key]==key2){
            temp[key]=id[key2];
            break;
          }
        }
      }
    }
  }

  $('.btn-danger').addClass("disabled");
  clickv=1;
  var cc= $(this);
  var b=($(this).html());
  if(!(b in obj)){    //If the clicked letter is not in plugboard connection, it is mapped to itself
    obj[b]=b;
  }
  plain_text+=b;
  $('#pt').html(plain_text);  //Simultaneously printing plain text

  //Testing code to see if plugboard works.
  for(key in obj){
    if (obj.hasOwnProperty(key)){
      if(b==key){
        Gen(rotor3,obj,temp);
        Gen(rotor2,temp,temp);
        Gen(rotor1,temp,temp);
        Gen(reflector,temp,temp);
        switchc=true;
        Gen(rotor1,temp,temp);
        Gen(rotor2,temp,temp);
        Gen(rotor3,temp,temp);
        console.log(obj);
        for(var q in obj){
          if(temp[key]==obj[q]){
            console.log(q);
            temp[key]=q;
          }
        }
        cipher_text+=temp[key];
      }

    }
  }

//  console.log(temp[key]);
  $('.prow1').children().each(function() {
  //  console.log($(this.html))
    if(temp[key]==$(this).html()){
      $(this).addClass("glow").delay(1000).queue(function(){
        $(this).removeClass("glow").dequeue();
      });
    }
  });
  $('.prow2').children().each(function() {
    if(temp[key]==$(this).html()){
      $(this).addClass("glow").delay(1000).queue(function(){
        $(this).removeClass("glow").dequeue();
      });
    }
  });
  $('.prow3').children().each(function() {
    if(temp[key]==$(this).html()){
      $(this).addClass("glow").delay(1000).queue(function(){
        $(this).removeClass("glow").dequeue();
      });
    }
  });
  $('#st').html(cipher_text);   //Printing Ciper text
});
//Updating an object that maps the letters to be switched  (PLUG BOARD)
$('.btn-danger').click(function(){
  if(clickv==0){
    flag++;
    if(flag<=2){
      a.push($(this).html());
      if(flag==2 && a[0]!=a[1]){
        obj[a[0]]=a[1];
        flag=0;
        a=[];
      }
    }
  }
});

$('.btn-reset').click(function(){
  clickv=0;
  $('.btn-danger').removeClass('disabled');
  Rotor_1.create_arrays("Q");
  Rotor_2.create_arrays("E");
  Rotor_3.create_arrays("V");
  $('#rotor3').html(Rotor_3.let_array[0]);
  $('#rotor2').html(Rotor_2.let_array[0]);
  $('#rotor1').html(Rotor_1.let_array[0]);
  plain_text = "Plaintext - ";
  cipher_text = "Ciphertext - ";
  $('#pt').html(plain_text);
  $('#st').html(cipher_text);
})

jQuery.fn.extend({
    toggleHTML: function (a, b){
        var that = this;
            if (that.html() != a && that.html() != b){
                that.html(a);
            }
            else
            if (that.html() == a){
                that.html(b);
            }
            else
            if (that.html() == b){
                that.html(a);
            }
        return this;
    }
});

$("#rotors").hover(function(){
  $('.opener').toggleHTML('<p class="vert">There are 3 rotors in this machine(there can be more!). Set the initial value of each rotor. You can also reset the machine to initial state. Scroll down to find out the details of how the rotor works.</p>', '<p class="vert">Hover over a region to learn about it!</p>');
});

$("#lightb").hover(function(){
  $('.opener').toggleHTML('<p class="vert">This is the lightboard. The letter that lights up is the encrypted letter.</p>', '<p class="vert">Hover over a region to learn about it!</p>');
});

$("#keyb").hover(function(){
  $('.opener').toggleHTML('<p class="vert">This is the keyboard. Here, you click on the letters you want to encrypt.</p>', '<p class="vert">Hover over a region to learn about it!</p>');
});

$("#plugb").hover(function(){
  $('.opener').toggleHTML('<p class="vert">This is the plugboard. Every consecutive pair of buttons clicked are mapped to each other for an additional layer of security. If you click Q then E, both these letters are mapped.</p>', '<p class="vert">Hover over a region to learn about it!</p>');
});
