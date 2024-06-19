<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expression de Besoin</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .container {
            width: 80%;
            margin: 0 auto;
        }
        .header {
            text-align: left;
            margin-bottom: 20px;
        }
        .header p {
            margin: 2px 0;
        }
        .to {
            margin-bottom: 20px;
        }
        .to p {
            margin: 2px 0;
        }
        .subject {
            margin-bottom: 20px;
            font-weight: bold;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        .footer {
            text-align: left;
        }
        .footer p {
            margin: 2px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <p>IPN</p>
            <p>DEIS</p>
            <p>Division du consommable</p>
            <p>Imprimerie scolaire</p>
        </div>
        <div class="to">
            <p>A</p>
            <p>Monsieur le Directeur Général</p>
            <p>De l'IPN</p>
            <p>S/C Voie hiérarchique</p>
        </div>
        <div class="subject">
            <p>Objet : {{ $expressionbesoin->description }}</p>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Désignation</th>
                    <th>Quantité</th>
                    <th>Motif</th>
                </tr>
            </thead>
            <tbody>
            @foreach($details_expbesoins as $detail)
                <tr>
                    <td>{{ $detail->catalogueProduit->designation }}</td>

                    <td>{{ $detail->quantite }}</td>
                    <td>{{ $detail->categorie->type }}</td>
                    
                </tr>
            @endforeach
            </tbody>
        </table>
        <div class="footer">
            <p>Nouakchott le 05/07/2023</p>
            <p>Chef de Division</p>
        </div>
    </div>
</body>
</html>
