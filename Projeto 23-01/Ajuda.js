

function validate() {
    var retVal = true;
    if ($('#pessoa').val().trim().length < 5 || $('#pessoa').val().trim().length > 80) {
        $('#pessoaError').show();
        retVal = false;
    }
    else $('#pessoaError').hide();

    var re = /\S+@\S+\.\S+/;
    var email = $('#email').val().trim();
    if (!re.test(email)) {
        $('#emailError').show();
        retVal = false;
    }
    else $('#emailError').hide();

    if ($('input[name="duvida"]:checked').length < 1) {
        $("#duvidaError").show();
        retval = false;
    }
    else {
        $("#duvidaError").hide();

    }

    if ($('#comentario').val().trim().length < 10 || $('#comentario').val().trim().length > 250) {
        $('#comentarioError').show();
        retVal = false;
    }
    else $('#comentarioError').hide();
    return retVal;
}

function clean() {
    $('#pessoaError').hide();
    $('#comentarioError').hide();
    $("#duvidaError").hide();
    $('#emailError').hide();
}