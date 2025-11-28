export type IconName = 'star' | 'trophy' | 'hourglass'

export interface Stats {
  watchedCount: number
  watchedMinutes: number
}

export interface AchievementDef {
  id: string
  label: string
  description: string
  icon: IconName
  check: (s: Stats) => boolean
}

// Quelques helpers pour éviter de répéter la logique
function byCount(id: string, n: number, label: string, description: string, icon: IconName): AchievementDef {
  return {
    id,
    label,
    description,
    icon,
    check: (s) => s.watchedCount >= n,
  }
}

function byMinutes(id: string, n: number, label: string, description: string, icon: IconName): AchievementDef {
  return {
    id,
    label,
    description,
    icon,
    check: (s) => s.watchedMinutes >= n,
  }
}

export const ACHIEVEMENTS: AchievementDef[] = [
  // Tes succès d'origine
  {
    id: 'first-watch',
    label: 'Première séance',
    description: 'Regarder 1 film',
    icon: 'star',
    check: (s) => s.watchedCount >= 1,
  },
  {
    id: 'marathon',
    label: 'Marathon',
    description: 'Regarder 5 films',
    icon: 'trophy',
    check: (s) => s.watchedCount >= 5,
  },
  {
    id: 'ten-hours',
    label: '10 heures',
    description: 'Cumuler 600 minutes',
    icon: 'hourglass',
    check: (s) => s.watchedMinutes >= 600,
  },

  // Palier par nombre de films
  byCount('watch-3', 3, 'Échauffement', 'Regarder 3 films', 'star'),
  byCount('watch-10', 10, 'Cinéphile débutant', 'Regarder 10 films', 'trophy'),
  byCount('watch-20', 20, 'Binge watcher', 'Regarder 20 films', 'trophy'),
  byCount('watch-30', 30, 'No life du cinéma', 'Regarder 30 films', 'trophy'),
  byCount('watch-40', 40, 'Toujours plus', 'Regarder 40 films', 'trophy'),
  byCount('watch-50', 50, 'Cinéphage', 'Regarder 50 films', 'trophy'),
  byCount('watch-60', 60, 'Visionneur compulsif', 'Regarder 60 films', 'trophy'),
  byCount('watch-70', 70, 'Salle obscure virtuelle', 'Regarder 70 films', 'trophy'),
  byCount('watch-80', 80, 'Projection privée', 'Regarder 80 films', 'trophy'),
  byCount('watch-90', 90, 'Collectionneur de crédits', 'Regarder 90 films', 'trophy'),
  byCount('watch-100', 100, 'Centenaire', 'Regarder 100 films', 'trophy'),

  // Paliers de temps
  byMinutes('time-300', 300, 'Mini marathon', 'Cumuler 300 minutes de visionnage', 'hourglass'),
  byMinutes('time-900', 900, 'Soirée ciné', 'Cumuler 900 minutes de visionnage (15h)', 'hourglass'),
  byMinutes('time-1800', 1800, 'Weekend ciné', 'Cumuler 1800 minutes de visionnage (30h)', 'hourglass'),
  byMinutes('time-3600', 3600, 'Semaine cinéma', 'Cumuler 3600 minutes de visionnage (60h)', 'hourglass'),
  byMinutes('time-7200', 7200, 'No sleep', 'Cumuler 7200 minutes de visionnage (120h)', 'hourglass'),

  // Série de succès “combo films”
  byCount('combo-5', 5, 'Combo 5', 'Atteindre 5 films au total', 'star'),
  byCount('combo-15', 15, 'Combo 15', 'Atteindre 15 films au total', 'star'),
  byCount('combo-25', 25, 'Combo 25', 'Atteindre 25 films au total', 'star'),
  byCount('combo-35', 35, 'Combo 35', 'Atteindre 35 films au total', 'star'),
  byCount('combo-45', 45, 'Combo 45', 'Atteindre 45 films au total', 'star'),
  byCount('combo-55', 55, 'Combo 55', 'Atteindre 55 films au total', 'star'),
  byCount('combo-65', 65, 'Combo 65', 'Atteindre 65 films au total', 'star'),
  byCount('combo-75', 75, 'Combo 75', 'Atteindre 75 films au total', 'star'),
  byCount('combo-85', 85, 'Combo 85', 'Atteindre 85 films au total', 'star'),
  byCount('combo-95', 95, 'Combo 95', 'Atteindre 95 films au total', 'star'),

  // Encore des paliers temps pour remplir
  byMinutes('time-1200', 1200, 'Quart de journée', 'Cumuler 1200 minutes (20h)', 'hourglass'),
  byMinutes('time-2400', 2400, 'Demi semaine', 'Cumuler 2400 minutes (40h)', 'hourglass'),
  byMinutes('time-4800', 4800, 'Grosse session', 'Cumuler 4800 minutes (80h)', 'hourglass'),
  byMinutes('time-9600', 9600, 'Possédé par le 7e art', 'Cumuler 9600 minutes (160h)', 'hourglass'),

  // Tu peux continuer à dupliquer ces patterns pour aller à ~100 succès
]