//Crear un plugin

jQuery.fn.fill_or_clean = function () {
    this.each(function () {
        if ($("#id_prod").attr("value") == "") {
            $("#id_prod").attr("value", "Introduce ID Product");
            $("#id_prod").focus(function () {
                if ($("#id_prod").attr("value") == "Introduce ID Product") {
                    $("#id_prod").attr("value", "");
                }
            });
        }
        $("#id_prod").blur(function () { //Onblur se activa cuando el usuario retira el foco
            if ($("#id_prod").attr("value") == "") {
                $("#id_prod").attr("value", "Introduce ID Product");
            }
        });
        
        if ($("#prod_name").attr("value") == "") {
            $("#prod_name").attr("value", "Introduce Product name");
            $("#prod_name").focus(function () {
                if ($("#prod_name").attr("value") == "Introduce Product name") {
                    $("#prod_name").attr("value", "");
                }
            });
        }
        $("#prod_name").blur(function () { //Onblur se activa cuando el usuario retira el foco
            if ($("#prod_name").attr("value") == "") {
                $("#prod_name").attr("value", "Introduce Product name");
            }
        });
        
        if ($("#price").attr("value") == "") {
            $("#price").attr("value", "Introduce price of product");
            $("#price").focus(function () {
                if ($("#price").attr("value") == "Introduce price of product") {
                    $("#price").attr("value", "");
                }
            });
        }
        $("#price").blur(function () { //Onblur se activa cuando el usuario retira el foco
            if ($("#price").attr("value") == "") {
                $("#price").attr("value", "Introduce price of product");
            }
        });
        
         if ($("#dis_date").attr("value") == "") {
            $("#dis_date").attr("value", "Introduce Discharge date");
            $("#dis_date").focus(function () {
                if ($("#dis_date").attr("value") == "Introduce Discharge date") {
                    $("#dis_date").attr("value", "");
                }
            });
        }
        $("#dis_date").blur(function () {
            if ($("#dis_date").attr("value") == "") {
                $("#dis_date").attr("value", "Introduce Discharge date");
            }
        });
        
        if ($("#exp_date").attr("value") == "") {
            $("#exp_date").attr("value", "Introduce Date of expire");
            $("#exp_date").focus(function () {
                if ($("#exp_date").attr("value") == "Introduce Date of expire") {
                    $("#exp_date").attr("value", "");
                }
            });
        }
        $("#exp_date").blur(function () {
            if ($("#exp_date").attr("value") == "") {
                $("#exp_date").attr("value", "Introduce Date of expire");
            }
        });
        
    });//each
    return this;

};//function

//Solution to : "Uncaught Error: Dropzone already attached."
Dropzone.autoDiscover = false;

$(document).ready(function () {
    
    //Datepicker///////////////////////////
    $("#dis_date").datepicker({
        dateFormat: 'mm/dd/yy',
        defaultDate: 'today',
        changeMonth: true,
        changeYear: true
    });
    $("#exp_date").datepicker({
        dateFormat: 'mm/dd/yy',
        defaultDate: 'today',
        changeMonth: true,
        changeYear: true
    });
    
    //Valida Products /////////////////////////
    $('#submit_product').click(function () {
        validate_products();
    });
    
    
    //Control de seguridad para evitar que al volver atrás de la pantalla results a create, no nos imprima los datos
    $.get("modules/products/controller/controller_products.class.php?load_data=true",
            function (response) {
                //alert(response.products);
                if (response.products === "") {
                    $("#id_prod").val('');
                    $("#prod_name").val('');
                    $("#price").val('');
                    $("#dis_date").val('');
                    $("#exp_date").val('');
                    //siempre que creemos un plugin debemos llamarlo, sino no funcionará
    $(this).fill_or_clean();
                } else {
                    $("#id_prod").val( response.products.id_prod);
                    $("#prod_name").val( response.products.prod_name);
                    $("#price").val( response.products.price);
                    $("#dis_date").val( response.products.dis_date);
                    $("#exp_date").val( response.products.exp_date);
                }
            }, "json");
            
            
            
    //Dropzone function //////////////////////////////////
    $("#dropzone").dropzone({
        url: "modules/products/controller/controller_products.class.php?upload=true",
        addRemoveLinks: true,
        maxFileSize: 1000,
        dictResponseError: "Ha ocurrido un error en el server",
        acceptedFiles: 'image/*,.jpeg,.jpg,.png,.gif,.JPEG,.JPG,.PNG,.GIF,.rar,application/pdf,.psd',
        init: function () {
            this.on("success", function (file, response) {
                // console.log(response);
                //alert(response);
                $("#progress").show();
                $("#bar").width('100%');
                $("#percent").html('100%');
                $('.msg').text('').removeClass('msg_error');
                $('.msg').text('Success Upload image!!').addClass('msg_ok').animate({'right': '300px'}, 300);
            });
        },
        removedfile: function (file, serverFileName) {
            var name = file.name;
            $.ajax({
                type: "POST",
                url: "modules/products/controller/controller_products.class.php?delete=true",
                data: "filename=" + name,
                success: function (data) {
                    //console.log(data);
                    $("#progress").hide();
                    $('.msg').text('').removeClass('msg_ok');
                    $('.msg').text('').removeClass('msg_error');
                    $("#e_avatar").html("");

                    var json = JSON.parse(data);
                    if (json.res === true) {
                        var element;
                        if ((element = file.previewElement) != null) {
                            element.parentNode.removeChild(file.previewElement);
                            //alert("Imagen eliminada: " + name);
                        } else {
                            false;
                        }
                    } else { //json.res == false, elimino la imagen también
                        var element;
                        if ((element = file.previewElement) != null) {
                            element.parentNode.removeChild(file.previewElement);
                        } else {
                            false;
                        }
                    }
                }
            });
        }
    });
    
    //Utilizamos las expresiones regulares para las funciones de  fadeout
    var id_reg = /^[0-9]{8}$/ ;
    var name_reg= /^[A-Za-z]{2,30}$/;
    var numb_reg = /^[0-9]+$/ ;
    var date_reg = /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d$/;


    //realizamos funciones para que sea más práctico nuestro formulario
    $("#id_prod").keyup(function () {
        if ($(this).val() != "" && id_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });
    
    $("#prod_name").keyup(function () {
        if ($(this).val() != "" && name_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });
    
    $("#price").keyup(function () {
        if ($(this).val() != "" && numb_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });
    
    $("#dis_date").keyup(function () {
        if ($(this).val() != "" && date_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });
    
    $("#exp_date").keyup(function () {
        if ($(this).val() != "" && date_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });
    
    load_countries_v1();
    $("#province").empty();
    $("#province").append('<option value="" selected="selected">Select a province</option>');
    $("#province").prop('disabled', true);
    $("#population").empty();
    $("#population").append('<option value="" selected="selected">Select a population</option>');
    $("#population").prop('disabled', true);
    
    $("#country").change(function() {
		var country = $(this).val();
		var province = $("#province");
		var population = $("#population");
				
		if(country !== 'ES'){
	         province.prop('disabled', true);
	         population.prop('disabled', true);
	         $("#province").empty();
		     $("#population").empty();
		}else{
	         province.prop('disabled', false);
	         population.prop('disabled', false);
	         load_provincias_v1();
		}//fi else
	});
	
	$("#province").change(function() {
		var prov = $(this).val();
		if(prov > 0){
			load_poblaciones_v1(prov);
		}else{
			$("#population").prop('disabled', false);
		}
	});
    
});//fi ready

//Functions Countries
function load_countries_v2(cad) {
    $.getJSON( cad, function(data) {8
      $("#country").empty();
      $("#country").append('<option value="" selected="selected">Select a country</option>');
      
      $.each(data, function (i, valor) {
        $("#country").append("<option value='" + valor.sISOCode + "'>" + valor.sName + "</option>");
      });
    })
    .fail(function() {
        // console.log(cad);
        alert( "error load_countries" );
    });
}

function load_countries_v1() {
    $.get( "modules/products/controller/controller_products.class.php?load_pais=true", 
        function( response ) {
             console.log(response);
            if(response.match('error')){
                load_countries_v2("resources/ListOfCountryNamesByName.json");
            }else{
                load_countries_v2("modules/products/controller/controller_products.class.php?load_pais=true"); //oorsprong.org
                // load_countries_v2("resources/ListOfCountryNamesByName.json");
            }
    })
    .fail(function(response) {
        load_countries_v2("resources/ListOfCountryNamesByName.json");
    });
}

function load_provincias_v2() {
    $.get("resources/provinciasypoblaciones.xml", function (xml) {
	    $("#province").empty();
	    $("#province").append('<option value="" selected="selected">Select a province</option>');
	            
        $(xml).find("province").each(function () {
            var id = $(this).attr('id');
            var nombre = $(this).find('nombre').text();
            $("#province").append("<option value='" + id + "'>" + nombre + "</option>");
        });
    })
    .fail(function() {
        alert( "error load_provinces" );
    });
}

function load_provincias_v1() { //provinciasypoblaciones.xml - xpath
    $.get( "modules/products/controller/controller_products.class.php?load_provincias=true", 
        function( response ) {
            $("#province").empty();
	        $("#province").append('<option value="" selected="selected">Select a province</option>');
	    
            //console.log(response);
            var json = JSON.parse(response);
		    var provincias=json.provincias;
		    //alert(provincias);
		    //console.log(provincias);

		    //alert(provincias[0].id);
		    //alert(provincias[0].nombre);
    		
            if(provincias === 'error'){
                load_provincias_v2();
            }else{
                for (var i = 0; i < provincias.length; i++) { 
        		    $("#province").append("<option value='" + provincias[i].id + "'>" + provincias[i].nombre + "</option>");
    		    }
            }
    })
    .fail(function(response) {
        load_provincias_v2();
    });
}

function load_poblaciones_v2(prov) {
    $.get("resources/provinciasypoblaciones.xml", function (xml) {
		$("#population").empty();
	    $("#population").append('<option value="" selected="selected">Select a population</option>');
			    
		$(xml).find('provincia[id=' + prov + ']').each(function(){
    		$(this).find('localidad').each(function(){
    			 $("#population").append("<option value='" + $(this).text() + "'>" + $(this).text() + "</option>");
    		});  
        });
	})
	.fail(function() {
        alert( "error load_population" );
    });
}

function load_poblaciones_v1(prov) { //provinciasypoblaciones.xml - xpath
    var datos = { idPoblac : prov  };
	$.post("modules/products/controller/controller_products.class.php", datos, function(response) {
	    //console.log(response);
        var json = JSON.parse(response);
		var poblaciones=json.poblaciones;
		//alert(poblaciones);
		//console.log(poblaciones);
		//alert(poblaciones[0].poblacion);

		$("#population").empty();
	    $("#population").append('<option value="" selected="selected">Select a population</option>');

        if(poblaciones === 'error'){
            load_poblaciones_v2(prov);
        }else{
            for (var i = 0; i < poblaciones.length; i++) { 
        		$("#population").append("<option value='" + poblaciones[i].poblacion + "'>" + poblaciones[i].poblacion + "</option>");
    		}
        }
	})
	.fail(function() {
        load_poblaciones_v2(prov);
    });
}

///////////////////////////////////////////////
function validate_pais(pais) {
    if (pais == null) {
        //return 'default_pais';
        return false;
    }
    if (pais.length == 0) {
        //return 'default_pais';
        return false;
    }
    if (pais === 'Select a country') {
        //return 'default_pais';
        return false;
    }
    if (pais.length > 0) {
        var regexp = /^[a-zA-Z]*$/;
        return regexp.test(pais);
    }
    return false;
}
function validate_provincia(provincia) {
    if (provincia == null) {
        return 'default_provincia';
    }
    if (provincia.length == 0) {
        return 'default_provincia';
    }
    if (provincia === 'Select a province') {
        //return 'default_provincia';
        return false;
    }
    if (provincia.length > 0) {
        var regexp = /^[a-zA-Z0-9, ]*$/;
        return regexp.test(provincia);
    }
    return false;
}
function validate_poblacion(poblacion) {
    if (poblacion == null) {
        return 'default_poblacion';
    }
    if (poblacion.length == 0) {
        return 'default_poblacion';
    }
    if (poblacion === 'Select a population') {
        //return 'default_poblacion';
        return false;
    }
    if (poblacion.length > 0) {
        var regexp = /^[a-zA-Z/, -'()]*$/;
        return regexp.test(poblacion);
    }
    return false;
}

function validate_products() {
    var result = true;

    var id_prod = document.getElementById('id_prod').value;
    var prod_name = document.getElementById('prod_name').value;
    var price = document.getElementById('price').value;
    var dis_date = document.getElementById('dis_date').value;
    var exp_date = document.getElementById('exp_date').value;
    var status;
    
    var country = $("#country").val();
    var province = $("#province").val();
    var population = $("#population").val();
    
    var v_country = validate_pais(country);
	var v_province = validate_provincia(province);
	var v_population= validate_poblacion(population);
    
    if(document.getElementById('status1').checked){
        status = document.getElementById('status1').value;
    }
    else if(document.getElementById('status2').checked){
        status = document.getElementById('status2').value;
    }
    else if(document.getElementById('status3').checked){
        status = document.getElementById('status3').value;
    }
    
    var id_reg = /^[0-9]{8}$/ ;
    var name_reg= /^[A-Za-z]{2,30}$/;
    var numb_reg = /^[0-9]+$/ ;
    var date_reg = /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d$/;
    
        $(".error").remove();
        if ($("#id_prod").val() == "" || $("#id_prod").val() == "Introduce ID Product") {
            $("#id_prod").focus().after("<span class='error'>Introduce ID Product</span>");
            result = false;
            return false;
        } else if (!id_reg.test($("#id_prod").val())) {
            $("#id_prod").focus().after("<span class='error'>ID product should have 8 numbers</span>");
            result = false;
            return false;
        }
        
        else if ($("#prod_name").val() == "" || $("#prod_name").val() == "Introduce Product name") {
            $("#prod_name").focus().after("<span class='error'>Introduce Product name</span>");
            result = false;
            return false;
        } else if (!name_reg.test($("#prod_name").val())) {
            $("#prod_name").focus().after("<span class='error'> Product name should have between 2 or 20 lettes.</span>");
            result = false;
            return false;
        }
        
        else if ($("#price").val() == "" || $("#price").val() == "Introduce Product price") {
            $("#price").focus().after("<span class='error'>Introduce Product price</span>");
            result = false;
            return false;
        } else if (!numb_reg.test($("#price").val())) {
            $("#price").focus().after("<span class='error'> Product price should have only numbers.</span>");
            result = false;
            return false;
        }
        
        else if ($("#dis_date").val() == "" || $("#dis_date").val() == "Introduce Discharge date") {
            $("#dis_date").focus().after("<span class='error'>Introduce Discharge date</span>");
            result = false;
            return false;
        } else if (!date_reg.test($("#dis_date").val())) {
            $("#dis_date").focus().after("<span class='error'>Error format date (mm/dd/yyyy)</span>");
            result = false;
            return false;
        }
        
        else if ($("#exp_date").val() == "" || $("#exp_date").val() == "Introduce Date of expire") {
            $("#exp_date").focus().after("<span class='error'>Introduce Date of expire</span>");
            result = false;
            return false;
        } else if (!date_reg.test($("#exp_date").val())) {
            $("#exp_date").focus().after("<span class='error'>Error format date (mm/dd/yyyy)</span>");
            result = false;
            return false;
        }
        
        if (!v_country) {
             document.getElementById('e_country').innerHTML = "Select a country";
            result = false;
        } else {
            document.getElementById('e_country').innerHTML = "";
        }
            
        if (!v_province) {
            document.getElementById('e_province').innerHTML = "Select a province";
            result = false;
        } else {
            document.getElementById('e_province').innerHTML = "";
        }
            
        if (!v_population) {
            document.getElementById('e_population').innerHTML = "Select a population";
            result = false;
        } else {
            document.getElementById('e_population').innerHTML = "";
        }
        

    //Si ha ido todo bien, se envian los datos al servidor
    if (result) {
        
        if (province == null) {
            province = 'default_province';
        }else if (province.length == 0) {
            province = 'default_province';
        }else if (province === 'Select a province') {
            return 'default_province';
        }
        
        if (population == null) {
            population = 'default_population';
        }else if (population.length == 0) {
            population = 'default_population';
        }else if (population === 'Select a population') {
            return 'default_population';
        }
        
        // Con estado
        var data = {"id_prod": id_prod, "prod_name": prod_name, "price": price,"dis_date": dis_date,
        "exp_date": exp_date, "status": status, "country": country, "province": province, 
        "population": population};
        
        var data_products_JSON = JSON.stringify(data);
        //console.log(data_products_JSON);
        $.post('modules/products/controller/controller_products.class.php',
                {alta_products_json: data_products_JSON},
                
        function (response) {
            console.log(response);
            if (response.success) {
                window.location.href = response.redirect;
            }
            //console.log(response);
            //alert(response);  //para debuguear
            //}); //para debuguear
        }, "json").fail(function (xhr) {
           console.log(xhr.responseJSON);
           
           if (xhr.status === 0) {
                alert('Not connect: Verify Network.');
            } else if (xhr.status == 404) {
                alert('Requested page not found [404]');
            } else if (xhr.status == 500) {
                alert('Internal Server Error [500].');
            } else if (textStatus === 'parsererror') {
                alert('Requested JSON parse failed.');
            } else if (textStatus === 'timeout') {
                alert('Time out error.');
            } else if (textStatus === 'abort') {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error: ' + xhr.responseText);
            }
           
           if (xhr.responseJSON == 'undefined' && xhr.responseJSON == null )
                xhr.responseJSON = JSON.parse(xhr.responseText);
           
           if (xhr.responseJSON.error.id_prod)
                $("#id_prod").focus().after("<span  class='error1'>" + xhr.responseJSON.error.id_prod + "</span>");

            if (xhr.responseJSON.error.prod_name)
                $("#prod_name").focus().after("<span  class='error1'>" + xhr.responseJSON.error.prod_name + "</span>");

            if (xhr.responseJSON.error.price)
                $("#price").focus().after("<span  class='error1'>" + xhr.responseJSON.error.price + "</span>");

            if (xhr.responseJSON.error.dis_date)
                $("#dis_date").focus().after("<span  class='error1'>" + xhr.responseJSON.error.dis_date + "</span>");

            if (xhr.responseJSON.error_avatar)
                $("#dropzone").focus().after("<span  class='error1'>" + xhr.responseJSON.error_avatar + "</span>");
                
            if (xhr.responseJSON !== undefined && xhr.responseJSON !== null) {
                if (xhr.responseJSON.error.country !== undefined && xhr.responseJSON.error.country !== null) {
                    $("#e_country").text(xhr.responseJSON.error.country);
                }
            }
            if (xhr.responseJSON !== undefined && xhr.responseJSON !== null) {
                if (xhr.responseJSON.error.province !== undefined && xhr.responseJSON.error.province !== null) {
                    $("#e_province").text(xhr.responseJSON.error.province);
                }
            }
            if (xhr.responseJSON !== undefined && xhr.responseJSON !== null) {
                if (xhr.responseJSON.error.population !== undefined && xhr.responseJSON.error.population !== null) {
                    $("#e_population").text(xhr.responseJSON.error.population);
                }
            }
            if (xhr.responseJSON.success1) {
                if (xhr.responseJSON.img_avatar !== "/Projecte_1.0/media/default-avatar.jpg") {
                    //$("#progress").show();
                    //$("#bar").width('100%');
                    //$("#percent").html('100%');
                    //$('.msg').text('').removeClass('msg_error');
                    //$('.msg').text('Success Upload image!!').addClass('msg_ok').animate({ 'right' : '300px' }, 300);
                }
            } else {
                $("#progress").hide();
                $('.msg').text('').removeClass('msg_ok');
                $('.msg').text('Error Upload image!!').addClass('msg_error').animate({'right': '300px'}, 300);
            }
        });
}
}