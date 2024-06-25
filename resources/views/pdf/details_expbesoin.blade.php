<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bon de Sortie</title>
    <style>
        body {
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            color: #555;
            font-weight: bold;

        }

        .container {
            max-width: 800px;
            margin: auto;
            padding: 30px;
        }

        header, footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #000;
            margin-bottom: 10px;
            padding-bottom: 10px;
        }

        header div, footer div {
            width: 30%;
        }

        h1, h2 {
            text-align: center;
            margin: 0;
        }

        h1 {
            margin-top: 20px;
            font-size: 24px;
        }

        h2 {
            font-size: 20px;
        }

        .info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .info div {
            width: 45%;
        }

        .invoice-box table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        .invoice-box table th, .invoice-box table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        .invoice-box table th {
            background: #eee;
            font-weight: bold;
        }

        @media only screen and (max-width: 600px) {
            .container, header, footer, .info {
                padding: 10px;
                flex-direction: column;
                align-items: center;
            }

            header div, footer div, .info div {
                width: 100%;
                text-align: center;
                margin-bottom: 10px;
            }
        }
    </style>
</head>
<body>

<div class="container">
    <div class="left">
        <p>IPN</p>
        <p>DEIS</p>
        <p>Division du consommable</p>
        <p>Imprimerie scolaire</p>
    </div>

    <h1>A <br>Monsieur le Directeur Général <br>De l'IPN<br>S/C Voie hiérarchique</h1>



        <div class="left">
            <h3>Objet : {{ $expressionbesoin->description }}</h3>
        </div>


    <div class="invoice-box"> 
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
                        <td>{{ $detail->Produit->designation }}</td>
                        <td>{{ $detail->quantite }}</td>
                        <td>{{ $expressionbesoin->description }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="left">
        <p>Nouakchott le {{ $expressionbesoin->created_at->format('Y-m-d') }}</p>
        <p>Chef de Division</p>
    </div>
</div>
</body>
</html>
