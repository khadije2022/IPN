<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des catégories</title>
</head>
<body>
    <h1>Liste des catégories</h1>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">type</th>
            </tr>
        </thead>
        <tbody>
            @foreach($categories as $item)
            <tr>
                <td>{{ $item->id }}</td>
                <td>{{ $item->type }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
