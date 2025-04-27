import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Download, BookOpen, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface DownloadData {
  id: string;
  expiresAt: string;
  downloadCount: number;
  maxDownloads: number;
  ebook: {
    id: string;
    title: string;
    author: string;
    fileSize: string;
    coverImage: string;
  };
}

const DownloadPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [downloadData, setDownloadData] = useState<DownloadData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState<string>('');

  // Fonction pour calculer le temps restant
  const calculateRemainingTime = (expiryDate: string) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffMs = expiry.getTime() - now.getTime();
    
    if (diffMs <= 0) {
      return "Expiré";
    }
    
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHrs} heures et ${diffMins} minutes`;
  };

  // Effet pour valider le token de téléchargement
  useEffect(() => {
    const validateToken = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulation d'appel API - en production, remplacer par un vrai appel à l'API
        // const response = await fetch(`/api/downloads/validate/${token}`);
        // const data = await response.json();
        
        // Données simulées pour la démonstration
        const data = {
          status: 'success',
          data: {
            download: {
              id: '123456789',
              expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // 48h à partir de maintenant
              downloadCount: 1,
              maxDownloads: 3,
              ebook: {
                id: 'eb001',
                title: 'Intelligence Artificielle pour Entrepreneurs',
                author: 'Matthieu Blanc',
                fileSize: '2.4 MB',
                coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
              }
            }
          }
        };
        
        if (data.status === 'success') {
          setDownloadData(data.data.download);
          setRemainingTime(calculateRemainingTime(data.data.download.expiresAt));
          
          // Mettre à jour le temps restant toutes les minutes
          const timer = setInterval(() => {
            setRemainingTime(calculateRemainingTime(data.data.download.expiresAt));
          }, 60000);
          
          return () => clearInterval(timer);
        } else {
          setError(data.message || 'Une erreur est survenue');
        }
      } catch (err: any) {
        setError(err.message || 'Une erreur est survenue lors de la validation du lien');
      } finally {
        setLoading(false);
      }
    };
    
    validateToken();
  }, [token]);

  // Fonction pour déclencher le téléchargement
  const handleDownload = () => {
    if (!downloadData) return;
    
    setDownloadStarted(true);
    
    // En production, utilisez un vrai lien de téléchargement
    const downloadLink = `/api/downloads/download/${token}`;
    
    // Ouvrir le téléchargement dans un nouvel onglet
    window.open(downloadLink, '_blank');
    
    // Mettre à jour le compteur de téléchargement dans l'interface
    setDownloadData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        downloadCount: prev.downloadCount + 1
      };
    });
  };

  // Afficher un indicateur de chargement
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-10">
          <div className="container max-w-3xl mx-auto px-4">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-lg">Validation de votre lien de téléchargement...</p>
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
          <div className="container max-w-3xl mx-auto px-4">
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
            <div className="text-center py-10">
              <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-4">Lien de téléchargement invalide</h1>
              <p className="mb-8 text-muted-foreground">
                Le lien que vous avez utilisé est invalide, a expiré ou a atteint le nombre maximum de téléchargements.
              </p>
              <Button asChild>
                <Link to="/contact">Contacter le support</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Afficher la page de téléchargement
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container max-w-3xl mx-auto px-4">
          {downloadStarted && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle>Téléchargement lancé</AlertTitle>
              <AlertDescription>
                Votre téléchargement devrait commencer automatiquement. Si ce n'est pas le cas, 
                <button 
                  onClick={handleDownload} 
                  className="text-primary underline ml-1"
                >
                  cliquez ici
                </button>.
              </AlertDescription>
            </Alert>
          )}
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Votre ebook est prêt à être téléchargé</CardTitle>
              <CardDescription>
                Merci pour votre achat. Voici les détails de votre téléchargement.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {downloadData && (
                <div className="grid md:grid-cols-5 gap-6">
                  <div className="md:col-span-2">
                    <img 
                      src={downloadData.ebook.coverImage} 
                      alt={downloadData.ebook.title} 
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  
                  <div className="md:col-span-3 space-y-4">
                    <h2 className="text-xl font-bold">{downloadData.ebook.title}</h2>
                    <p className="text-muted-foreground">par {downloadData.ebook.author}</p>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span>Taille du fichier: {downloadData.ebook.fileSize}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Download className="h-4 w-4 mr-2" />
                      <span>Téléchargement {downloadData.downloadCount} sur {downloadData.maxDownloads}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Expire dans: {remainingTime}</span>
                    </div>
                    
                    <div className="mt-6">
                      <Button 
                        size="lg" 
                        className="w-full" 
                        onClick={handleDownload}
                        disabled={downloadData.downloadCount >= downloadData.maxDownloads}
                      >
                        <Download className="mr-2 h-5 w-5" /> 
                        Télécharger maintenant
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 bg-muted/50 p-6 mt-4 text-sm">
              <h3 className="font-semibold">Important:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Ce lien est valable pour une durée limitée.</li>
                <li>Vous pouvez télécharger cet ebook jusqu'à {downloadData?.maxDownloads} fois.</li>
                <li>Ce lien est personnel, veuillez ne pas le partager.</li>
              </ul>
              <p>
                En cas de problème, veuillez <Link to="/contact" className="text-primary underline">contacter notre support</Link>.
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DownloadPage;
