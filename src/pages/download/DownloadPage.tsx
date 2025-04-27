
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Download, FileText, ShieldCheck, Clock } from 'lucide-react';

interface EbookData {
  id: string;
  title: string;
  author: string;
  fileSize: string;
  coverImage: string;
}

interface DownloadData {
  id: string;
  expiresAt: string;
  downloadCount: number;
  maxDownloads: number;
  ebook: EbookData;
}

const DownloadPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [downloadData, setDownloadData] = useState<DownloadData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const validateDownloadToken = async () => {
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
              id: 'dl001',
              expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
              downloadCount: 0,
              maxDownloads: 3,
              ebook: {
                id: 'eb001',
                title: 'Intelligence Artificielle pour Entrepreneurs',
                author: 'Jean Dupont',
                fileSize: '2.5 MB',
                coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'
              }
            }
          }
        };
        
        if (data.status === 'success') {
          setDownloadData(data.data.download);
        } else {
          // Modifié ici : Au lieu de data.message, utilisons une valeur par défaut
          setError('Lien de téléchargement invalide');
        }
      } catch (err: any) {
        setError(err.message || 'Une erreur est survenue lors de la validation du lien');
      } finally {
        setLoading(false);
      }
    };
    
    validateDownloadToken();
  }, [token]);

  const handleDownload = async () => {
    if (!downloadData) return;
    
    setDownloading(true);
    
    try {
      // Simulation d'un téléchargement - en production, remplacer par un vrai téléchargement
      // window.location.href = `/api/downloads/${token}`;
      
      // Simulation d'un délai de téléchargement
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Incrémenter le compteur de téléchargements
      setDownloadData({
        ...downloadData,
        downloadCount: downloadData.downloadCount + 1
      });
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors du téléchargement');
    } finally {
      setDownloading(false);
    }
  };

  // Formater la date d'expiration
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

  // Calculer le temps restant avant expiration
  const getRemainingTime = (dateString: string) => {
    const expiration = new Date(dateString).getTime();
    const now = Date.now();
    
    if (expiration < now) {
      return 'Expiré';
    }
    
    const remainingMs = expiration - now;
    const hours = Math.floor(remainingMs / (1000 * 60 * 60));
    
    if (hours < 24) {
      return `${hours} heure${hours > 1 ? 's' : ''}`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days} jour${days > 1 ? 's' : ''}`;
    }
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
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2 mb-2 md:mb-0">
                  <FileText className="h-5 w-5" />
                  <CardTitle>Télécharger votre eBook</CardTitle>
                </div>
                {downloadData && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>
                      Expire dans {getRemainingTime(downloadData.expiresAt)}
                    </span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {downloadData && (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div className="md:col-span-2">
                    <div className="aspect-[3/4] bg-muted rounded-md overflow-hidden">
                      <img
                        src={downloadData.ebook.coverImage}
                        alt={downloadData.ebook.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-3 space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold">{downloadData.ebook.title}</h2>
                      <p className="text-muted-foreground">par {downloadData.ebook.author}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Format</span>
                        <span className="font-medium">PDF</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Taille du fichier</span>
                        <span className="font-medium">{downloadData.ebook.fileSize}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Téléchargements restants</span>
                        <span className="font-medium">
                          {downloadData.maxDownloads - downloadData.downloadCount} sur {downloadData.maxDownloads}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Lien valide jusqu'au</span>
                        <span className="font-medium">{formatDate(downloadData.expiresAt)}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleDownload}
                        disabled={downloading || downloadData.downloadCount >= downloadData.maxDownloads}
                      >
                        {downloading ? (
                          <div className="flex items-center">
                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-background border-t-transparent rounded-full" /> 
                            Téléchargement en cours...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Download className="mr-2 h-5 w-5" /> 
                            Télécharger maintenant
                          </div>
                        )}
                      </Button>
                      
                      {downloadData.downloadCount >= downloadData.maxDownloads && (
                        <p className="mt-2 text-sm text-destructive text-center">
                          Vous avez atteint le nombre maximum de téléchargements
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col bg-muted/50 p-6 border-t">
              <div className="flex items-start gap-3 text-sm">
                <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p>Ce lien vous est personnellement réservé. Ne le partagez pas avec d'autres personnes.</p>
                  <p className="mt-1">Le fichier est protégé par des droits d'auteur et ne peut être redistribué.</p>
                </div>
              </div>
            </CardFooter>
          </Card>
          
          <div className="flex justify-center">
            <Button asChild variant="outline">
              <Link to="/catalog">Continuer mes achats</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DownloadPage;
