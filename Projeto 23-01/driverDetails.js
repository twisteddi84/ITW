// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Drivers/Driver?id=');
    self.baseUri2 = ko.observable('http://192.168.160.58/Formula1/api/Statistics/Driver?id=');
    self.displayName = 'Driver Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.DriverId = ko.observable('');
    self.DriverRef = ko.observable('');
    self.ImageUrl = ko.observable('');
    self.Name = ko.observable('');
    self.Nationality = ko.observable('');
    self.Number = ko.observable('');
    self.Races = ko.observableArray('');
    self.Url = ko.observable('');
    self.Wins = ko.observable('');
    self.Career = ko.observableArray('');

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getDriver...');
        var composedUri = self.baseUri() + id;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            self.DriverId(data.DriverId);
            self.DriverRef(data.DriverRef);
            self.ImageUrl(data.ImageUrl);
            self.Name(data.Name);
            self.Nationality(data.Nationality);
            self.Number(data.Number);
            self.Races(data.Races);
            self.Url(data.Url);
            google.charts.setOnLoadCallback(drawChart);
            hideLoading();

        });
    };

    self.activate2 = function (id) {
        console.log('CALL: getDriver...');
        var composedUri2 = self.baseUri2() + id;
        ajaxHelper(composedUri2, 'GET').done(function (data) {
            console.log(data);
            self.Wins(data.Wins);
            self.Career(data.Career);
            hideLoading();
        });
    };

    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });

    }
    function showLoading() {
        $('#myModal').modal('show',{
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['', 'Estatísticas de vitórias'],
            ['Corridas Ganhas', self.Wins()],
            ['Corridas não ganhas', self.Races().length - self.Wins()]
        ]);

        // Optional; add a title and set the width and height of the chart
        var options = {
            'title': 'Estatísticas de vitórias', is3D: true, backgroundColor: 'black', titleTextStyle: { color: 'white', fontSize: 18 }, legendTextStyle: { color: 'white' }, 'width': 550, 'height': 400, slices: { 1: { offset: 0.2 } }};

        // Display the chart inside the <div> element with id="piechart"
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
    //--- start ....
    showLoading();
    var pg = getUrlParameter('id');
    console.log(pg);
    if (pg == undefined) {
        self.activate(1);
        self.activate2(1);
    }else {
        self.activate(pg);
        self.activate2(pg);
    }
};

$(document).ready(function () {
    console.log("ready!");
    google.charts.load('current', { 'packages': ['corechart'] });
    ko.applyBindings(new vm());
});
