// Object types
import localeString from './objects/localeString';
import localeText from './objects/localeText';
import localeBlock from './objects/localeBlock';
import programmeRow from './objects/programmeRow';
import quickLink from './objects/quickLink';
// Singletons
import siteSettings from './singletons/siteSettings';
import home from './singletons/home';
import about from './singletons/about';
import participation from './singletons/participation';
import rules from './singletons/rules';
import contact from './singletons/contact';
// Collections
import timelineEntry from './collections/timelineEntry';
import event from './collections/event';
import sponsorTier from './collections/sponsorTier';
import sponsor from './collections/sponsor';
import committeeMember from './collections/committeeMember';
import galleryItem from './collections/galleryItem';
import newsPost from './collections/newsPost';

export const schemaTypes = [
  localeString, localeText, localeBlock, programmeRow, quickLink,
  siteSettings, home, about, participation, rules, contact,
  timelineEntry, event, sponsorTier, sponsor, committeeMember, galleryItem, newsPost,
];
