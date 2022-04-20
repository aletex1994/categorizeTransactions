
            var lista_trans=[
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
          sourceAccount: 'my_account',
          targetAccount: 'prova',
          amount: -120,
          time: '2021-04-10T10:30:00Z',
        },      
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'prova',
          amount: -6800,
          category: 'eating_out',
          time: '2021-03-12T12:34:00Z',
        }, 
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'prova',
          amount: -6100,
          
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'prova',
          amount: -6400,
          
          time: '2021-03-12T12:34:00Z',
        }, 
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'prov',
          amount: -210,
          
          time: '2021-03-12T12:34:00Z',
        },       
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'prova',
          amount: -500,
          category: 'eating_out2',
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'prova',
          amount: -400,
          category: 'eating_out2',
          time: '2021-03-12T12:34:00Z',
        }
        
      ]

function categorizza_transazioni(transazioni){
            var categorized=[];
            var uncategorized=[];
            var matched=[];
            var matched_elements=[];
            
            var i=0;
            //2 array contenenti categorizzati e non cat
            transazioni.forEach(function(transation){            
                                                      if(transation.hasOwnProperty('category')){
                                                        categorized.push(i);
                                                        }else{
                                                          uncategorized.push(i);
                                                        }
                                                      i++;
                                                      })


            //indago i non categorizzati
            uncategorized.forEach(function(uncat_index){
            //ricavo due variabili che mi servono per il confronto
            var uncat_target=transazioni[uncat_index].targetAccount;
            var uncat_amount=transazioni[uncat_index].amount;
            
            categorized.forEach(function(cat_index){

                                                    var cat_target=transazioni[cat_index].targetAccount;
                                                    var cat_amount=transazioni[cat_index].amount;
                                                      
                                                    var val_min_amount=Math.min(cat_amount,uncat_amount);
                                                    var val_max_amount=Math.max(cat_amount,uncat_amount);

                                                    var diff_amount=val_max_amount-val_min_amount;
                                                    //se si verifica che il non categorizzato ha lo stesso target
                                                    //del non categorizzato e la diff<1000 aggiungo l'indice dell elemento 
                                                    //all'array matched. L'array MATCHED conterrà quindi tutti gli indici degli elementi con stesso target
                                                    // e diff<1000 
                                                    if(cat_target==uncat_target&&diff_amount<1000){
                                                      matched.push(cat_index);
                                                    }

                                                    }) 

          //ricavo lunghezza array MATCHED
           var length_matched=matched.length;
          
          //considero la lunghezza di MATCHED e gestisco

          //SE E' 0 non vi è nessuna corrispondenza
           if(length_matched==0){
            //DO SOMETHING
              matched=[];
             
           }
          //se è 1 vi è un solo match quindi prende la categoria del match (posizione 0);
           if(length_matched==1){
            transazioni[uncat_index].category=transazioni[matched[0]].category;
             matched=[];
             
           }
           //se è >1 :
           //creo l'obj matched_element
           //attribuisco la chiave .difference e la chiave .index_in_transitions
           //lo aggiungo all'array matched_elements
           if(length_matched>1){
            
            matched.forEach(function(matched_index){
              var matched_element={};
              var matched_amount = transazioni[matched_index].amount;
              var val_min=Math.min(matched_amount,uncat_amount);
              var val_max=Math.max(matched_amount,uncat_amount);
              var matched_difference=val_max-val_min;
              
              matched_element.difference=matched_difference;
              matched_element.index_in_transitions=matched_index;
              matched_elements.push(matched_element);

            })
            
            var array_differences=[];
            var index_element,min_diff;

            //Genero un array contenente solo i valori delle differenze di ogni elemento
            //e ricavo la differenza minima ( min_diff )
            matched_elements.forEach(function(element){
              array_differences.push(element.difference);
              min_diff=Math.min.apply(null, array_differences);
            })

            //con questo ciclo indago gli elementi singoli, 
            //se la diff_min == elemento.difference significa che dovrò
            //accedere alla proprietà index_in_transitions di quell elemento.
            //Ora ho l index del elemento in transizioni con il quale il mio elemento uncategorized ha la differenza di amount minore.
            //Aggiungo la proprietà .category al mio elemento non categorizzato e gli do il valore dell elemento con l'index trovato nello step precedente.
            matched_elements.forEach(function(element){
              if(element.difference==min_diff){
                index_element=element.index_in_transitions;
                transazioni[uncat_index].category=transazioni[index_element].category;
              }
            })
          matched=[];
          matched_elements=[];
          }
           
           })

         
           return transazioni;
}
   console.log(categorizza_transazioni(lista_trans));

     //1-salvo indici di elementi categorizzati e uncategorized
     //2-risalgo a target e amount di ogni elemento uncategorized
     //3-tengo traccia degli indici degli elementi nell array MATCHED con lo stesso target e dove la differenza di amount è inferiore a 1000
     //
     //4-se la lunghezza dell array degli elementi con lo stesso target e differenza <1000 è ==1 significa che ce un elemento combaciante e quindi vado subito ad attribuire
     //la categoria 
      // se la lunghezza è >1 devo:
      //-indagare ogni matched e fare la differenza
      //-storare le differenze
      //-recuperare index della differenza più bassa
   
