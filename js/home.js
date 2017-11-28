$(document).ready(function() {
    loadItems();

    $('#money-in').val(0);

    $('#addDollar').on('click', function(event){
        
        var total = parseFloat($('#money-in').val());
            total += 1;

        $('#money-in').val(total.toFixed(2));
    });

    $('#addQuarter').on('click', function(event){
        var total = parseFloat($('#money-in').val());
        total += 0.25;

    $('#money-in').val(total.toFixed(2));
    });

    $('#addDime').on('click', function(event){
        
        var total = parseFloat($('#money-in').val());
        total += 0.10;

        $('#money-in').val(total.toFixed(2));   
    });

    $('#addNickel').on('click', function(event){
        var total = parseFloat($('#money-in').val());
            total += 0.05;

        $('#money-in').val(total.toFixed(2));    
    });

    $('#purchase-button').on('click', function(event){
        var id = $('#item-in').val();
        var total = $('#money-in').val();
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/money/' + total + '/item/' + id,
                success: function(data, status){
                    var change = '';
                    var quarters = 'Quarters: ' + data.quarters;
                    var dimes = 'Dimes: ' + data.dimes;
                    var nickels = 'Nickels: ' + data.nickels;
                    
                    if(data.quarters > 0)
                        change += quarters;
                    if(data.dimes > 0)
                        change += dimes;
                    if(nickels > 0)
                        change += nickels;
                    
                    $('#change-returned').val(change);    
                    $('#message-in').val('Thank you!');
                },
                error: function(data, status){
                    var message = data.responseJSON.message;
                    alert(message);
                }
        });

    });

    $('#change-return').on('click', function(event){
        $('#money-in').val(0);
        $('#change-returned').val('');    
        $('#message-in').val('');
        $('#item-in').val('');
        total = 0;

        $('#items-to-vend').empty();
        loadItems();
    });
});

function loadItems(){

    var column = $('#items-to-vend');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/items',
        success: function(itemArray){
            $.each(itemArray, function(index, item){
                var id = item.id;
                var name = item.name;
                var price = item.price;
                var quantity = item.quantity;

                var row = '<div class = "col-sm-4" style = "text-align: center; padding: 2px; border: 1px solid #021a40"><a onclick="selectItem(' + id + ')">';
                    row += '<p>' + name + '</p>';
                    row += '<p>$' + price + '</p>';
                    row += '<p>Quantity Left: ' + quantity + '</p>';
                    row += '</a></div>';

                    

                column.append(row);

            });
        },
        error: function(){

        }
    })
}

function selectItem(id){
$('#item-in').val(id);
}



