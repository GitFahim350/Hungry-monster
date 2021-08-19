const search_button=document.getElementById('search_button');

const cards=document.getElementById('full_row');

var card_id=0;


search_button.addEventListener('click',()=>{

    search_bar=document.getElementById('search_bar').value;

    
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i='+search_bar)
    .then(res=> res.json())
    //.then(data=> console.log(data))
    
     .then(data=>serach_operation(data))

     const serach_operation=data=>{
        const fullrow=document.getElementById('full_row');
        fullrow.innerHTML='';
        console.log(data);
        for(var i=0;i<data.meals.length;i++){

        const cells=document.createElement('div');
        cells.className='col-md-3 mt-3 columns';
        
        
        const htmltag=`

        <div class="card" id="${data.meals[i]['strMeal']}">
            <div class="img_div" style="background: url('${data.meals[i]['strMealThumb']}');background-position: center;background-size: cover; border-radius: 10px; width: 100%;height: 400px;">

            </div>
                        
            <p class="p-3">${data.meals[i]['strMeal']}</p>
        </div>        
        
        `;
        cells.innerHTML=htmltag;
        // console.log(cells);

        const fullrow=document.getElementById('full_row');


         fullrow.appendChild(cells);

     }
    }

}
)

document.getElementById('full_row').addEventListener('click',(event)=>{
    // console.log(event.target.parentNode.id);
    // console.log(document.getElementsByTagName("P"));
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+event.target.parentNode.id)
    .then(res=> res.json())
    //.then(data=> console.log(data))
    
     .then(data=>{
         
        console.log(data);
        document.getElementById('body_class').innerHTML='';

        const htmltext=`<div class="container p-5 bg-light" id="information" ">


        <img class="container" src="${data.meals[0]['strMealThumb']}" alt="">
        <h3 class=" container" >Musturs oil</h3>
        <h4 class=" container">ingredients</h4>
        <ul class="container" id="ingredients">
        

        </ul>



    </div>`

    // data..meals[0]['strIngredient']

    document.getElementById('body_class').innerHTML=htmltext;

    var array1=[];
    var array2=[];

    Object.keys(data.meals[0]).map(item => {

        let ingredi=item.slice(0,13);
        
        if(ingredi=="strIngredient"){
            if(data.meals[0][item]!=''){
                
                array1.push(data.meals[0][item]);
                
            }
        }
        console.log(array1.length);

        
        ingredi=item.slice(0,10);
        if(ingredi=="strMeasure"){
            if(data.meals[0][item]!=''){
                array2.push(data.meals[0][item]);
            }
        }
        console.log(array2.length);

    }
    
    );
    for(var i=0;i<array1.length;i++){
        var fullstring=array2[i]+' '+array1[i];
        // console.log(array1[0],array2[0]);
        const list_item=document.createElement('LI');
            list_item.innerText=fullstring;
            
            const ul=document.getElementById('ingredients');
            ul.appendChild(list_item);


    }
})



})
