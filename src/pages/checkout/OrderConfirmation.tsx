import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Download, Mail, ShoppingBag, CheckCircle, Book } from 'lucide-react';

interface OrderItem {
  title: string;
  price: number;
  ebook: {
    id: string;
    title: string;
    coverImage: string;
  };
}

interface DownloadLink {
  id: string;
  downloadToken: string;
  downloadUrl: string;
  expiresAt: string;
  ebook: {
    id: string;
    title: string;
  };
}

interface OrderData {
  id: string;
  orderItems: OrderItem[];
  totalPrice: number;
  orderStatus: string;
  createdAt: string;
  downloads: DownloadLink[];
}

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulation d'appel API - en production, remplacer par un vrai appel à l'API
        // const response = await fetch(`/api/orders/${orderId}`);
        // const data = await response.json();
        
        // Données simulées pour la démonstration
        const data = {
          status: 'success',
          data: {
            order: {
              id: orderId || '12345',
              orderItems: [
                {
                  title: 'Intelligence Artificielle pour Entrepreneurs',
                  price: 24.99,
                  ebook: {
                    id: 'eb001',
                    title: 'Intelligence Artificielle pour Entrepreneurs',
                    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'
                  }
                },
                {
                  title: 'Les Fondamentaux du Développement Web Moderne',
                  price: 22.99,
                  ebook: {
                    id: 'eb002',
                    title: 'Les Fondamentaux du Développement Web Moderne',
                    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'
                  }
                }
              ],
              totalPrice: 47.98,
              orderStatus: 'Completed',
              createdAt: new Date().toISOString(),
              downloads: [
                {
                  id: 'dl001',
                  downloadToken: 'abcdef123456',
                  downloadUrl: '/download/abcdef123456',
                  expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
                  ebook: {
                    id: 'eb001',
                    title: 'Intelligence Artificielle pour Entrepreneurs'
                  }
                },
                {
                  id: 'dl002',
                  downloadToken: 'ghijkl789012',
                  downloadUrl: '/download/ghijkl789012',
                  expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
                  ebook: {
                    id: 'eb002',
                    title: 'Les Fondamentaux du Développement Web Moderne'
                  }
                }
              ]
            }
          }
        };
        
        if (data.status === 'success') {
          setOrderData(data.data.order);
        } else {
          setError(data.message || 'Une erreur est survenue');
        }
      } catch (err: any) {
        setError(err.message || 'Une erreur est survenue lors de la récupération des détails de la commande');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [orderId]);

  // Formater la date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Formater le prix
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  // Afficher un indicateur de chargement
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-10">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-lg">Chargement des détails de votre commande...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Afficher un message d'erreur
  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-10">
          <div className="container max-w-4xl mx-auto px-4">
            <Card className="border-destructive">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <CardTitle>Erreur</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>{error}</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/contact">Contacter le support</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container max-w-4xl mx-auto px-4">
          
          {/* Confirmation de commande */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Commande confirmée !</h1>
            <p className="text-muted-foreground text-lg">
              Merci pour votre achat. Votre commande a été traitée avec succès.
            </p>
          </div>
          
          {/* Détails de la commande */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <CardTitle>Détails de la commande</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {orderData && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Numéro de commande</p>
                      <p className="font-medium">{orderData.id}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium">{formatDate(orderData.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Statut</p>
                      <p className="font-medium">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {orderData.orderStatus}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total</p>
                      <p className="font-medium">{formatPrice(orderData.totalPrice)}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4">Articles</h3>
                    <div className="space-y-4">
                      {orderData.orderItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-16 h-16 flex-shrink-0">
                            <img 
                              src={item.ebook.coverImage} 
                              alt={item.title} 
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">Format numérique</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatPrice(item.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Liens de téléchargement */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                <CardTitle>Vos livres électroniques</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {orderData && (
                <div className="space-y-6">
                  <p>
                    Vos ebooks sont prêts à être téléchargés. Vous pouvez les télécharger immédiatement ou utiliser les liens qui vous ont été envoyés par email.
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    {orderData.downloads.map((download) => (
                      <Card key={download.id} className="bg-muted/50">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-3">
                            <Book className="h-5 w-5 mt-1 text-primary" />
                            <div>
                              <h4 className="font-semibold">{download.ebook.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                Lien valable jusqu'au {formatDate(download.expiresAt)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t bg-background">
                          <Button asChild className="w-full">
                            <Link to={download.downloadUrl}>
                              <Download className="mr-2 h-4 w-4" /> Télécharger
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p>Nous vous avons envoyé un email contenant vos liens de téléchargement. Vérifiez votre boîte de réception.</p>
                      <p className="mt-1">Si vous ne le trouvez pas, vérifiez votre dossier "spam" ou "promotions".</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link to="/account/orders">Voir mes commandes</Link>
            </Button>
            <Button asChild>
              <Link to="/catalog">Continuer mes achats</Link>
            </Button>
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
