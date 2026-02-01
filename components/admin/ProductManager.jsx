'use client';

import { useState, useEffect } from 'react';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    emoji: '🎁',
    badge: '',
    image: ''
  });

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('crochetProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Load default products from data/products.js
      const defaultProducts = [
        { id: 1, name: 'Cozy Baby Blanket', description: 'Soft, warm blanket perfect for newborns. Made with hypoallergenic yarn in beautiful pastel colors.', price: 1200, emoji: '👶', badge: 'Popular', image: '' },
        { id: 2, name: 'Amigurumi Teddy Bear', description: 'Adorable handmade teddy bear, perfect gift for kids. Soft, safe, and cuddly!', price: 650, emoji: '🧸', badge: '', image: '' },
        { id: 3, name: 'Elegant Table Runner', description: 'Beautiful lace pattern table runner to enhance your dining experience. Available in multiple colors.', price: 850, emoji: '🌸', badge: '', image: '' },
        { id: 4, name: 'Warm Winter Scarf', description: 'Cozy and stylish scarf for cold weather. Soft texture and vibrant colors available.', price: 550, emoji: '🧣', badge: 'New', image: '' },
        { id: 5, name: 'Decorative Cushion Cover', description: 'Add a handmade touch to your home with these beautiful cushion covers. Custom colors available.', price: 450, emoji: '🛋️', badge: '', image: '' },
        { id: 6, name: 'Baby Booties Set', description: 'Cute and comfortable booties for babies. Comes in a set of 2 pairs with matching colors.', price: 400, emoji: '👶', badge: 'Popular', image: '' },
        { id: 7, name: 'Flower Bouquet', description: 'Everlasting crochet flowers that never wilt. Perfect for home decor or as a unique gift.', price: 700, emoji: '💐', badge: '', image: '' },
        { id: 8, name: 'Coaster Set (6 pcs)', description: 'Beautiful handmade coasters to protect your furniture. Set of 6 in coordinating colors.', price: 350, emoji: '☕', badge: '', image: '' },
        { id: 9, name: 'Pet Sweater', description: 'Keep your furry friend warm with this adorable crochet sweater. Custom sizes available.', price: 600, emoji: '🐕', badge: 'New', image: '' },
        { id: 10, name: 'Chunky Throw Blanket', description: 'Extra cozy oversized blanket for your couch. Perfect for movie nights and cold evenings.', price: 1500, emoji: '🧶', badge: 'Popular', image: '' },
        { id: 11, name: 'Amigurumi Bunny', description: 'Sweet little bunny with floppy ears. Makes a perfect Easter gift or nursery decoration.', price: 550, emoji: '🐰', badge: '', image: '' },
        { id: 12, name: 'Boho Wall Hanging', description: 'Trendy macramé-style wall decoration. Adds a warm, handmade touch to any room.', price: 900, emoji: '🎨', badge: 'New', image: '' },
        { id: 13, name: 'Market Tote Bag', description: 'Sturdy and stylish reusable shopping bag. Eco-friendly alternative to plastic bags.', price: 450, emoji: '👜', badge: '', image: '' },
        { id: 14, name: 'Baby Hat & Mitten Set', description: 'Adorable matching set to keep little ones warm. Soft yarn, gentle on sensitive skin.', price: 500, emoji: '🎀', badge: 'Popular', image: '' },
        { id: 15, name: 'Granny Square Afghan', description: 'Classic vintage-style blanket with colorful granny squares. A timeless piece of comfort.', price: 1800, emoji: '🌈', badge: '', image: '' },
        { id: 16, name: 'Kitchen Dishcloth Set', description: 'Set of 4 durable, absorbent dishcloths. Practical and pretty for your kitchen.', price: 300, emoji: '🧽', badge: '', image: '' },
        { id: 17, name: 'Infinity Scarf', description: 'Stylish loop scarf that stays in place. Versatile accessory for any outfit.', price: 600, emoji: '🔄', badge: '', image: '' },
        { id: 18, name: 'Amigurumi Elephant', description: 'Cute elephant with big ears and a sweet smile. Great for kids and collectors alike.', price: 700, emoji: '🐘', badge: 'New', image: '' }
      ];
      setProducts(defaultProducts);
      localStorage.setItem('crochetProducts', JSON.stringify(defaultProducts));
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('crochetProducts', JSON.stringify(products));
    }
  }, [products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...formData, id: editingProduct.id, price: Number(formData.price) }
          : p
      ));
      setEditingProduct(null);
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        id: Date.now(), // Simple ID generation
        price: Number(formData.price)
      };
      setProducts(prev => [...prev, newProduct]);
      setIsAddingNew(false);
    }

    // Reset form
    setFormData({
      name: '',
      description: '',
      price: '',
      emoji: '🎁',
      badge: '',
      image: ''
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      emoji: product.emoji,
      badge: product.badge || '',
      image: product.image || ''
    });
    setIsAddingNew(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      emoji: '🎁',
      badge: '',
      image: ''
    });
  };

  const emojiOptions = ['🎁', '👶', '🧸', '🌸', '🧣', '🛋️', '💐', '☕', '🐕', '🎀', '🧶', '💝', '🌺', '🦋', '🌈'];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Add New Product Button */}
      {!isAddingNew && (
        <div className="mb-8">
          <button
            onClick={() => setIsAddingNew(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add New Product
          </button>
        </div>
      )}

      {/* Add/Edit Product Form */}
      {isAddingNew && (
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-amber-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            {editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:outline-none transition-all"
                  placeholder="e.g., Cozy Baby Blanket"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:outline-none transition-all"
                  placeholder="e.g., 500"
                  min="0"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Image URL (Optional)
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:outline-none transition-all"
                placeholder="e.g., /images/blanket.jpg or https://..."
              />
              <p className="text-xs text-gray-500 mt-2">
                Leave empty to use emoji. For images, upload to /public/images/ folder first.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-rose-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          📦 All Products ({products.length})
        </h2>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-500 text-lg">No products yet. Add your first product!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border-2 border-rose-100 hover:border-rose-300 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{product.emoji}</div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {product.name}
                          {product.badge && (
                            <span className="ml-3 text-xs bg-amber-400 text-white px-3 py-1 rounded-full font-semibold">
                              {product.badge}
                            </span>
                          )}
                        </h3>
                        <p className="text-2xl font-bold text-rose-600 mt-1">₹{product.price}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold transition-all text-sm"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition-all text-sm"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
