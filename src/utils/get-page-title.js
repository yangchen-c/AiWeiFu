const title = '爱维服';

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle}`;
  }
  return `${title}`;
};
