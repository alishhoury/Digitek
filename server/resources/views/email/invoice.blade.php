<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Order Invoice</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 5px; }
        .content { margin: 20px 0; }
        .order-details { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .item { border-bottom: 1px solid #ddd; padding: 10px 0; }
        .total { font-weight: bold; font-size: 18px; text-align: right; margin-top: 15px; }
        .footer { text-align: center; margin-top: 30px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Order Invoice</h1>
            <p>Thank you for your order, {{ $order->user->first_name }} {{ $order->user->last_name }}!</p>
        </div>
        
        <div class="content">
            <div class="order-details">
                <p><strong>Order Number:</strong> {{ $order->order_number }}</p>
                <p><strong>Order ID:</strong> {{ $order->id }}</p>
                <p><strong>Order Date:</strong> {{ $order->created_at->format('d/m/Y') }}</p>
                <p><strong>Status:</strong> {{ ucfirst($order->status) }}</p>
            </div>
            
            <h3>Order Items:</h3>
            @foreach($order->products as $product)
                <div class="item">
                    {{ $product->name }} (x{{ $product->pivot->quantity }}) - ${{ number_format($product->pivot->price, 2) }}
                </div>
            @endforeach
            
            <div class="total">
                Total: ${{ number_format($order->total_price, 2) }}
            </div>
        </div>
        
        <div class="footer">
            <p>Thanks,<br>DIGITEK Customer Support</p>
            <p><small>This is an automated email. Please do not reply.</small></p>
        </div>
    </div>
</body>
</html>