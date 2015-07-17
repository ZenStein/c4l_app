
<!DOCTYPE html>
<html lang="en" ng-app="main">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Starter Template for Bootstrap</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ng-grid/2.0.11/ng-grid.css">
    <link rel="stylesheet" href="http://ui-grid.info/release/ui-grid-unstable.min.css">
      <link rel="stylesheet" href="css/login.css">
      <link rel="stylesheet" href="css/layout.css">
      <link rel="stylesheet" href="css/floating_labels.css">

  </head>

  <body>


  <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
          <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#/">Home</a>
          </div>
          <div id="navbar" class="collapse navbar-collapse">
              <ul class="nav navbar-nav">
                  <li class="active"><a href="#/data">Data</a></li>
                  <li><a href="#/register">Register</a></li>
                  <li><a href="#/login">Login</a></li>
                  <li><a href="#/employee">Employee</a></li>
                  <li><a href="#/housekeeping">Housekeeping</a></li>
              </ul>
          </div>
      </div>
  </nav>

  <div class="container">
  <div ng-view></div>
</div>

  </body>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular-route.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular-animate.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ng-grid/2.0.11/ng-grid.min.js"></script>
    <script src="http://ui-grid.info/release/ui-grid-unstable.min.js"></script>
    <script src="js/_underscore.js"></script>
    <script src="modules/angular_file_upload.js"></script>
    <script src="js/floatingLabels.js"></script>
    <script src="js/main.js"></script>

</html>
