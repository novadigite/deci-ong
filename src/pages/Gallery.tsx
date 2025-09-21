import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Calendar, MapPin, Users, ExternalLink } from "lucide-react";

// Import des nouvelles images
import deci1Img from "@/assets/gallery/deci1.jpg";
import deci2Img from "@/assets/gallery/deci2.jpg";
import deci3Img from "@/assets/gallery/deci3.jpg";
import deci4Img from "@/assets/gallery/deci4.jpg";
import deci5Img from "@/assets/gallery/deci5.jpg";

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const images = [
    {
      id: 1,
      url: deci1Img,
      title: "Formation et Leadership des Jeunes",
      description: "Jeune leader participant à une formation sur les droits de l'enfant",
      date: "2024-03-15",
      location: "Abidjan",
      participants: 25,
      category: "Formation"
    },
    {
      id: 2,
      url: deci2Img,
      title: "Conférence sur la Participation Citoyenne",
      description: "Présentation sur l'importance de la participation des enfants",
      date: "2024-02-20",
      location: "Yamoussoukro",
      participants: 80,
      category: "Conférence"
    },
    {
      id: 3,
      url: deci3Img,
      title: "Assemblée Générale des Conseils d'Enfants",
      description: "Réunion annuelle des représentants des Conseils Communaux d'Enfants",
      date: "2024-01-10",
      location: "Bouaké",
      participants: 150,
      category: "Assemblée"
    },
    {
      id: 4,
      url: deci4Img,
      title: "Rencontre avec les Autorités",
      description: "Dialogue entre les leaders DECI et les autorités locales",
      date: "2024-02-05",
      location: "Abidjan",
      participants: 15,
      category: "Événement"
    },
    {
      id: 5,
      url: deci5Img,
      title: "Session de Formation des Formateurs",
      description: "Formation destinée aux encadreurs des Conseils Communaux d'Enfants",
      date: "2024-03-01",
      location: "Abidjan",
      participants: 35,
      category: "Formation"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
      title: "Formation des Conseils Communaux d'Enfants",
      description: "Session de formation avec les jeunes représentants",
      date: "2024-01-15",
      location: "Abidjan",
      participants: 45,
      category: "Formation"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
      title: "Journée des Droits de l'Enfant",
      description: "Célébration de la journée internationale des droits de l'enfant",
      date: "2023-11-20",
      location: "Yamoussoukro",
      participants: 200,
      category: "Événement"
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800",
      title: "Ateliers de sensibilisation",
      description: "Sensibilisation dans les écoles sur les droits des enfants",
      date: "2024-02-10",
      location: "Bouaké",
      participants: 150,
      category: "Sensibilisation"
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800",
      title: "Assemblée Générale FENACCE-CI",
      description: "Réunion de la Fédération Nationale des Conseils Communaux d'Enfants",
      date: "2024-03-05",
      location: "Abidjan",
      participants: 75,
      category: "Assemblée"
    },
    {
      id: 10,
      url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800",
      title: "Programme de mentorat",
      description: "Accompagnement des jeunes leaders",
      date: "2024-01-30",
      location: "San-Pédro",
      participants: 30,
      category: "Mentorat"
    },
    {
      id: 11,
      url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
      title: "Conférence sur la participation des enfants",
      description: "Conférence nationale sur la participation des enfants aux décisions",
      date: "2023-12-15",
      location: "Abidjan",
      participants: 300,
      category: "Conférence"
    }
  ];

  const videos = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800",
      title: "Témoignage de Djédjé Aurelia Esther",
      description: "Présidente de la FENACCE-CI partage son expérience",
      date: "2024-02-20",
      duration: "5:32",
      category: "Témoignage"
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800",
      title: "Documentaire sur les Conseils Communaux d'Enfants",
      description: "Découvrez le fonctionnement des CCE en Côte d'Ivoire",
      date: "2023-11-10",
      duration: "12:45",
      category: "Documentaire"
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
      title: "Formation des formateurs",
      description: "Session de formation pour les encadreurs des CCE",
      date: "2024-01-25",
      duration: "8:15",
      category: "Formation"
    },
    {
      id: 4,
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
      title: "Plaidoyer pour les droits des enfants",
      description: "Campagne de sensibilisation nationale",
      date: "2023-12-05",
      duration: "6:20",
      category: "Plaidoyer"
    }
  ];

  const categories = ["Toutes", "Formation", "Événement", "Sensibilisation", "Assemblée", "Mentorat", "Conférence", "Témoignage", "Documentaire", "Plaidoyer"];
  const [selectedCategory, setSelectedCategory] = useState("Toutes");

  const filteredImages = selectedCategory === "Toutes" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const filteredVideos = selectedCategory === "Toutes" 
    ? videos 
    : videos.filter(vid => vid.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-primary to-secondary">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Médiathèque
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Découvrez nos actions à travers notre galerie d'images et de vidéos
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Categories */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <Tabs defaultValue="images" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="videos">Vidéos</TabsTrigger>
            </TabsList>

            <TabsContent value="images">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image) => (
                  <Dialog key={image.id}>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer hover:shadow-lg transition-shadow group">
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img
                            src={image.url}
                            alt={image.title}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <Badge className="absolute top-2 right-2" variant="secondary">
                            {image.category}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2 text-foreground">
                            {image.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3">
                            {image.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(image.date).toLocaleDateString('fr-FR')}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {image.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {image.participants}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <div className="space-y-4">
                        <img
                          src={image.url}
                          alt={image.title}
                          className="w-full max-h-[70vh] object-contain rounded-lg"
                        />
                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-2">
                            {image.title}
                          </h2>
                          <p className="text-muted-foreground mb-4">
                            {image.description}
                          </p>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {new Date(image.date).toLocaleDateString('fr-FR')}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {image.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              {image.participants} participants
                            </div>
                            <Badge>{image.category}</Badge>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
              
              {/* Bouton Voir plus */}
              <div className="text-center mt-12">
                <Button
                  variant="default"
                  size="lg"
                  className="px-8 py-3"
                  onClick={() => window.open('https://web.facebook.com/ONGDECI/photos', '_blank')}
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Voir plus de photos sur Facebook
                </Button>
                <p className="text-muted-foreground text-sm mt-2">
                  Découvrez toutes nos activités en images
                </p>
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <Card key={video.id} className="cursor-pointer hover:shadow-lg transition-shadow group">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/90 rounded-full p-4">
                          <Play className="h-8 w-8 text-primary fill-current" />
                        </div>
                      </div>
                      <Badge className="absolute top-2 right-2" variant="secondary">
                        {video.category}
                      </Badge>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 text-foreground">
                        {video.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {video.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(video.date).toLocaleDateString('fr-FR')}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Gallery;