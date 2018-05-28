<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Vidstamp</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Alfa+Slab+One" rel="stylesheet" type="text/css">        

        <!-- Styles -->
        <link rel="stylesheet" href="{{ mix('css/app.css') }}" />        
    </head>
    <body class="bg-light">
        <div class="container my-4">
            <div class="mt-2 text-center clearfix">
                <img src="{{ asset('img/stamp.png') }}" class="img-fluid" style="max-width: 400px" />
                <h1 class="display-1" style="font-family: 'Alfa Slab One';">{{ strtoupper(config('app.name')) }}</h1>
                <div class="lead">The easiest way to add a watermark to your videos.</div>

                <p class="mt-4">
                    @auth
                        <a href="{{ route('app') }}" class="btn btn-primary btn-lg">Go to Dashboard</a>
                    @else
                        <a class="btn btn-primary btn-lg" href="{{ route('register') }}">Get Started</a>
                    @endif
                </p>

                @guest
                    <p class="mt-4"><a href="{{ route('login') }}">Already have an account? Sign in.</a></p>
                @endguest
            </div>
        </div>
    </body>
</html>
