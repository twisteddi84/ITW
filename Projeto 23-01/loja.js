function validate1() {
    var retVal = true;
    var selected = $('#1 option:selected').val();
    if (selected == 1) {
        retVal = false;
    };
    if (retVal == false) {
        window.setTimeout('alert("Selecione um tamanho!");', 100);
    }
    return retVal;
}

function validate2() {
    var retVal = true;
    var selected = $('#2 option:selected').val();
    if (selected == 1) {
        retVal = false;
    };
    return retVal;
}

function validate3() {
    var retVal = true;
    var selected = $('#3 option:selected').val();
    if (selected == 1) {
        retVal = false;
    };
    return retVal;
}

function validate4() {
    var retVal = true;
    var selected = $('#4 option:selected').val();
    if (selected == 1) {
        retVal = false;
    };
    return retVal;
}

function validate5() {
    var retVal = true;
    var selected = $('#5 option:selected').val();
    if (selected == 1) {
        retVal = false;
    };
    return retVal;
}
