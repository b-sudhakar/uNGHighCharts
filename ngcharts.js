'use strict';
app.directive('myLineChart', ['$compile', '$log', '$http', 'ngAppSettings', 'dashboardService', function ($compile, $log, $http, appSettings, dashboardService) {
    var linker = function (scope, element, attrs) {
        $log.log('Getting chart data');

        var renderChart = function (chartData) {
            chartData.title = null;
            $(element).highcharts(chartData);
        };

        var refresh = function () {
            dashboardService.getChartData(scope, scope.widget.apiID).then(function (data) {
                $log.log('Chart data ' + data);
                renderChart(data);
            }, function (err) {
                $(element).html('Error');
            });
        }

        /*scope.chartSettings.refresh = function () {
        refresh();
        }
        */
        refresh();
    };


    return {
        restrict: "E",
        link: linker,
        scope: {
            widget: '='
        },
        template: '<div id="container" style="margin: 0 auto"></div>',
        replace: true
    };


} ]);

app.directive('myPieChart', ['$compile', '$log', '$http', 'ngAppSettings', 'dashboardService', function ($compile, $log, $http, appSettings, dashboardService) {
    var linker = function (scope, element, attrs) {

        var renderPieChart = function (chartData) {
            // Build the chart
            $(element).highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title:null,
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{ type: 'pie',
                    name: chartData.name,
                    data: chartData.data
                }]
            });
        }

        var refresh = function () {
            dashboardService.getChartData(scope, scope.widget.apiID).then(function (data) {
                $log.log('Pie chart data ' + data);
                renderPieChart(data);
            }, function (err) {
                $(element).html('Error');
            });
        }

        /*scope.chartSettings.refresh = function () {
        refresh();
        }
        */
        refresh();
    };


    return {
        restrict: "E",
        link: linker,
        scope: {
            widget: '='
        },
        template: '<div id="container" style="margin: 0 auto"></div>',
        replace: true
    };


} ]);

app.directive('myColumnChart', ['$compile', '$log', '$http', 'ngAppSettings', 'dashboardService', function ($compile, $log, $http, appSettings, dashboardService) {
    var linker = function (scope, element, attrs) {

        var renderColumnChart = function (chartData) {
            // Build the chart


            $(element).highcharts({
                chart: {
                    type: 'column'
                },
                xAxis: { categories: chartData.categories, crosshair: true },
                yAxis: {
                    min: 0
                },
                title: {
                    text: null
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: chartData.series
            });
        }

        scope.$watch('chartOptions', function (newvalue, oldvalue, scope) {
            renderColumnChart(newvalue);
        });
    };

    return {
        restrict: "E",
        link: linker,
        scope: {
            chartOptions: '='
        },
        template: '<div id="container" style="margin: 0 auto"></div>',
        replace: true
    };


}]);
app.directive('myDualAxisColumnChart', ['$compile', '$log', '$http', 'ngAppSettings', 'dashboardService', function ($compile, $log, $http, appSettings, dashboardService) {
    var linker = function (scope, element, attrs) {

        var renderColumnChart = function (chartData) {
            // Build the chart


            $(element).highcharts({
                chart: {
                    zoomType: 'xy'
                },
                xAxis: { categories: chartData.categories, crosshair: true },
                yAxis: [{ //primary axis

                    labels: {
                        format: chartData.yAxis.primary.labelFormat,
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: chartData.yAxis.primary.title,
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }, { // Secondary yAxis
                    title: {
                        text: chartData.yAxis.secondary.title,
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    labels: {
                        format: chartData.yAxis.secondary.labelFormat,
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    opposite: true
                }],
                title: {
                    text: chartData.title
                },
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 120,
                    verticalAlign: 'top',
                    y: 100,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },
                series: chartData.series
            });
        }

        scope.$watch('chartOptions', function (newvalue, oldvalue, scope) {
            renderColumnChart(newvalue);
        });
    };

    return {
        restrict: "E",
        link: linker,
        scope: {
            chartOptions: '='
        },
        template: '<div id="container" style="margin: 0 auto"></div>',
        replace: true
    };


}]);

app.directive('myStackColumnChart', ['$compile', '$log', '$http', 'ngAppSettings', 'dashboardService', function ($compile, $log, $http, appSettings, dashboardService) {
    var linker = function (scope, element, attrs) {

        var renderStackColumnChart = function (chartData) {
            // Build the chart
            $(element).highcharts({
                chart: {
                    type: 'column'
                },
                title: null,
                xAxis: { categories: chartData.categories },
                yAxis: {
                    min: 0,
                    title: {
                        text: chartData.dataTitle
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    align: 'right',
                    x: -70,
                    verticalAlign: 'top',
                    y: 20,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },

                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                            style: {
                                textShadow: '0 0 3px black, 0 0 3px black'
                            }
                        }
                    }
                },
                series: chartData.series
            });
        }

        var refresh = function () {
            dashboardService.getChartData(scope, scope.widget.apiID).then(function (data) {
                $log.log('Stack Column chart data ' + data);
                renderStackColumnChart(data);
            }, function (err) {
                $(element).html('Error');
            });
        }

        /*scope.chartSettings.refresh = function () {
        refresh();
        }
        */
        refresh();
    };


    return {
        restrict: "E",
        link: linker,
        scope: {
            widget: '='
        },
        template: '<div id="container" style="margin: 0 auto"></div>',
        replace: true
    };


} ]);
app.directive('myDrilldownGenericChart', ['$compile', '$log', '$http', 'ngAppSettings', 'dashboardService', function ($compile, $log, $http, appSettings, dashboardService) {

    var linker = function (scope, element, attrs) {

        var setChart = function (drilldown) {
            var chart = $(element).highcharts();
            $log.log('chart ' + chart + 'xAxis' + chart.xAxis + 'drilldown:' + drilldown.data);

            if (drilldown.categories)
                chart.xAxis[0].setCategories(drilldown.categories);

            chart.series[0].remove();

            var type = drilldown.type ? drilldown.type : 'column';
            chart.addSeries({
                type: drilldown.type ? drilldown.type : 'column',
                name: drilldown.name,
                data: drilldown.data,
                level: drilldown.level,
                color: drilldown.color ? drilldown.color : null,
                dataLabels: {
                    enabled: type == 'pie',
                    format: '{point.name}: {point.y:.1f}%'
                }
            });

        };



        var renderDrillDownChart = function (chartData) {

            var colors = Highcharts.getOptions().colors;

            var i = 0;
            angular.forEach(chartData.data, function (data) {
                data.color = colors[i];
            });

            var chartOptions = {
                chart: {
                    type: 'column'
                },
                xAxis: {
                    categories: chartData.categories
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                plotOptions: {
                    column: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {

                                    var drilldown = this.drilldown;
                                    $log.log('drill down in click ' + drilldown);
                                    if (drilldown) { // drill down

                                        this.series.chart.setTitle({
                                            text: drilldown.name
                                        });

                                        setChart(drilldown);
                                    } else {
                                        // restore
                                        setChart(this);
                                    }
                                }
                            }
                        }
                    },
                    pie: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {

                                    var drilldown = this.drilldown;
                                    if (drilldown) { // drill down

                                        this.series.chart.setTitle({
                                            text: drilldown.name
                                        });

                                        setChart(drilldown);
                                    } else {
                                        this.series.chart.setTitle({
                                            text: chartData.name
                                        });
                                        setChart(chartData);
                                    }
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: chartData.dataTitle,
                    level: 0,
                    data: chartData.data
                }],
                exporting: {
                    enabled: false
                }
            };

            $(element).highcharts(chartOptions);
        };

        var refresh = function () {
            var apiID;
            apiID = scope.chartOptions.apiID;

            dashboardService.getChartData(scope, apiID).then(function (data) {
                $log.log('Custom drill down chart data ' + data);
                renderDrillDownChart(data);
            }, function (err) {
                $(element).html('Error');
            });
        };


        refresh()
    };

    return {
        restrict: "E",
        link: linker,
        scope: {
            chartOptions: '='
        },
        template: '<div id="container" style="margin: 0 auto"></div>',
        replace: true
    };


} ]);
app.directive('myDrilldownColumnChart', ['$compile', '$log', '$http', 'ngAppSettings', 'dashboardService', function ($compile, $log, $http, appSettings, dashboardService) {
    var linker = function (scope, element, attrs) {


        var renderDrillDownChart = function (chartData) {

            Highcharts.setOptions({
                lang: {
                    drillUpText: '◁ Back to {series.name}'
                }
            });

            var brands = {}, brandsData = [];
            var detailsArray={};
            var drilldownSeries = new Array();

            angular.forEach(chartData.Data, function (data, i) {
                $log.log('name:' + data[0]);

                // Create the main data
                if (!brands[data[0]]) {
                    brands[data[0]] = data[2];
                } else {
                    brands[data[0]] += data[2];
                }

                var details = data[1];
                if (details !== null) {
                    if (!detailsArray[data[0]]) {
                        detailsArray[data[0]] = [];
                    }
                    detailsArray[data[0]].push([data[1], data[2]]);
                }

            });

            $.each(brands, function (name, y) {
                brandsData.push({
                    name: name,
                    y: y,
                    drilldown: detailsArray[name] ? name : null
                });
            });

            $.each(detailsArray, function (key, value) {
                drilldownSeries.push({
                    name: key,
                    id: key,
                    data: value
                });
            });

            $(element).highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: chartData.title
                },
                xAxis: { type: 'category' },
                subtitle: {
                    text: 'Click column for more details'
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    }
                },
                series: [{
                    name: chartData.dataTitle,
                    data: brandsData,
                    colorByPoint: true
                }],
                drilldown: {
                    series: drilldownSeries
                }
            });

        };

        scope.$watch('chartOptions', function (newvalue, oldvalue, scope) {
            renderDrillDownChart(newvalue);
        });

    };

    return {
        restrict: "E",
        link: linker,
        scope: {
            chartOptions: '='
        },
        template: '<div id="container" style="margin: 0 auto"></div>',
        replace: true
    };


} ]);
app.directive('myDrilldownPieChart', ['$compile', '$log', '$http', 'ngAppSettings', 'dashboardService', function ($compile, $log, $http, appSettings, dashboardService) {
    var linker = function (scope, element, attrs) {

        var renderDrillDownChart = function (chartData) {

            Highcharts.setOptions({
                lang: {
                    drillUpText: '◁ Back to {series.name}'
                }
            });

            var brands = {}, brandsData = [];
            var detailsArray = {};
            var drilldownSeries = new Array();

            angular.forEach(chartData.Data, function (data, i) {
                $log.log('name:' + data[0]);

                // Create the main data
                if (!brands[data[0]]) {
                    brands[data[0]] = data[2];
                } else {
                    brands[data[0]] += data[2];
                }

                var details = data[1];
                if (details !== null) {
                    if (!detailsArray[data[0]]) {
                        detailsArray[data[0]] = [];
                    }
                    detailsArray[data[0]].push([data[1], data[2]]);
                }

            });

            $.each(brands, function (name, y) {
                brandsData.push({
                    name: name,
                    y: y,
                    drilldown: detailsArray[name] ? name : null
                });
            });

            $.each(detailsArray, function (key, value) {
                drilldownSeries.push({
                    name: key,
                    id: key,
                    data: value
                });
            });

            $(element).highcharts({
                chart: {
                    type: 'pie'
                },
                title: {
                    text: chartData.title
                },
                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                },
                subtitle: {
                    text: 'Click the slices to view details.'
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    }
                },
                series: [{
                    name: chartData.dataTitle,
                    data: brandsData,
                    colorByPoint: true
                }],
                drilldown: {
                    series: drilldownSeries
                }
            });

        };

        scope.$watch('chartOptions', function (newvalue, oldvalue, scope) {
            renderDrillDownChart(newvalue);
        });

    };

    return {
        restrict: "E",
        link: linker,
        scope: {
            chartOptions: '='
        },
        template: '<div id="container" style="margin: 0 auto"></div>',
        replace: true
    };


}]);
app.directive('myCombinationChart', ['$compile', '$log', '$http', 'ngAppSettings', 'dashboardService', function ($compile, $log, $http, appSettings, dashboardService) {
    var linker = function (scope, element, attrs) {


        var renderCombinationChart = function (chartData) {

            $(element).highcharts({
                title: {
                    text: chartData.title
                },
                xAxis: { categories: chartData.categories },
                series: [{
                    data: chartData.columnData,
                    type: 'column'
                },
                    {
                        type: 'pie',
                        name: chartData.pieName,
                        data: chartData.pieData,
                        center: [100, 80],
                        size: 100,
                        showInLegend: false,
                        dataLabels: {
                            enabled: false
                        }
                    },
                    {
                        type: 'spline',
                        name: chartData.splineName,
                        data: chartData.splineData
                    }
                    ]

            });

        };

        var refresh = function () {
            var apiID;
            apiID = scope.chartOptions.apiID;

            dashboardService.getChartData(scope, apiID).then(function (data) {
                $log.log('Combination chart data ' + data);
                renderCombinationChart(data);
            }, function (err) {
                $(element).html('Error');
            });
        };

        refresh();
    };

    return {
        restrict: "E",
        link: linker,
        scope: {
            chartOptions: '='
        },
        template: '<div id="container" style="margin: 0 auto"></div>',
        replace: true
    };


} ]);