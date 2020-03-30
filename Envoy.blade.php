@setup

function editEnv($db){
putenv('DB_DATABASE='.$db);
if(env('DB_DATABASE') == $db){
    return 'success';
    }
}
function logMessage($message) {
return "echo '\033[32m" .$message. "\033[0m';\n";
}

@endsetup
@servers(['localhost'=>'127.0.0.1'])

@task('test',['on'=>'localhost'])
@if ($db)
    {{editEnv($db)}}
@endif
@endtask

@task('sql',['on'=>'localhost'])
@if ($db)
    mysql -u root -proot -e "create database {{$db}}"
{{--    php artisan migrate--}}
@endif
@endtask

@task('ide',['on'=>'localhost'])
{{ logMessage("🚚  Running Composer...") }}
composer require --dev barryvdh/laravel-ide-helper
php artisan vendor:publish --provider="Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider" --tag=config
php artisan ide-helper:generate
php artisan ide-helper:models
php artisan ide-helper:meta
@endtask

@task('git',['on'=>'localhost'])

@if ($title)
    {{ logMessage("🚚  Running Git...") }}
    curl -u 'Mohammed-Alama' https://api.github.com/user/repos -d "{\"name\":\"{{$title}}\"}"
    {{ logMessage("😎  Repo created success...") }}
    echo "# {{$title}}" >> README.md
    git init
    git add .
    git commit -m "first commit"
    git remote add origin "https://github.com/Mohammed-Alama/{{$title}}.git"
    git push -u origin master
    {{ logMessage("✅  Github mission done...") }}
@else
    echo "You need to provide title"
@endif
@endtask

@task('voyager',['on'=>'localhost','confirm'=>true])
composer require tcg/voyager
php artisan voyager:install --with-dummy
@endtask

@task('clear')
{{ logMessage("📀  Clearing now...") }}
php artisan clear-compiled
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan config:clear
composer dumpautoload -o
@endtask

@task('seo',['on'=>'localhost','confirm'=>true])
{{ logMessage("📀 Install spatie/laravel-sitemap...") }}
composer require spatie/laravel-sitemap
php artisan vendor:publish --provider="Spatie\Sitemap\SitemapServiceProvider" --tag=config
{{ logMessage("📀 Install artesaos/seotools...") }}
composer require artesaos/seotools
php artisan vendor:publish --provider="Artesaos\SEOTools\Providers\SEOToolsServiceProvider"
@endtask

@task('ui',['on'=>'localhost'])
composer require laravel/ui --dev
@if ($scaffolding == 'login')
    php artisan ui {{$frontend}} --auth
@elseif ($scaffolding == 'basic' && $frontend)
    php artisan ui {{$frontend}}
@endif
npm install && npm run dev
@endtask
