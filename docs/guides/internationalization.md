# Internationalization (i18n) Guide

This guide explains how internationalization is implemented in our Next.js application, its impact on SEO, and best practices for maintaining and extending it.

## Overview

Our application uses Next.js App Router with a middleware-based approach to handle internationalized routing. We support two languages:

- Spanish (`es`) - Primary/default language
- English (`en`) - Secondary language

## How It Works

### Directory Structure

```
src/
├── app/
│   ├── [lng]/                 # Dynamic route for language
│   │   ├── layout.tsx         # Language-specific layout
│   │   ├── page.tsx           # Main page with translations
│   │   └── ...                # Other pages
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Root page (redirects to default locale)
│   └── globals.css
└── dictionaries/              # Translation dictionaries
    ├── index.ts               # Dictionary loader
    ├── en.json                # English translations
    └── es.json                # Spanish translations
```

### Routing Mechanism

1. **Middleware** (`middleware.ts`):
   - Intercepts all requests
   - Checks if the URL already contains a locale prefix
   - If not, determines the user's preferred language and redirects to the localized route
   - Handles exceptions for static files and API routes

2. **Dynamic Routes**:
   - Uses the `[lng]` parameter to capture the language code
   - The `generateStaticParams` function pre-renders pages for all supported languages

3. **Translations**:
   - JSON dictionaries contain key-value pairs of translations
   - The `getDictionary` function loads the appropriate dictionary based on the current language
   - Server-side only imports improve performance

### Language Switching

The application includes a language switcher in the navigation that allows users to manually change the language by navigating to a URL with a different language prefix.

## SEO Benefits

Our i18n implementation provides several SEO advantages:

1. **Language-Specific URLs**:
   - Each language has its own URL path (e.g., `/es/about`, `/en/about`)
   - Search engines can index each language version independently

2. **HTML Lang Attribute**:
   - The `<html lang="...">` attribute is set dynamically based on the current language
   - Helps search engines understand the language of the content

3. **Automatic Language Detection**:
   - Users are redirected to their preferred language based on browser settings
   - Improves user experience and engagement metrics

4. **Canonical URLs**:
   - Each language version has a distinct URL, avoiding duplicate content issues

## Best Practices

### Adding New Content

When adding new pages or content:

1. Add the page under the `src/app/[lng]/` directory
2. Use the `params.lng` parameter to access the current language
3. Load translations using `getDictionary(lng)`
4. Ensure all user-facing text is translated via dictionary keys

### Adding New Translations

To add new translations:

1. Add new keys and values to all language JSON files in `src/dictionaries/`
2. Maintain the same structure across all language files
3. Organize translations into logical categories (e.g., `nav`, `common`, `buttons`)

### Adding a New Language

To add support for a new language:

1. Add the language code to the `languages` array in `src/dictionaries/index.ts`
2. Create a new JSON file in the `src/dictionaries/` directory for the language
3. Add the language code to the `locales` array in `middleware.ts`
4. Update the language switcher UI to include the new language

### SEO Optimization

For optimal SEO:

1. Include hreflang tags in the metadata for language alternatives
2. Ensure metadata (title, description) is translated for each language
3. Consider implementing structured data for each language version

## Extending the Implementation

### Date and Number Formatting

For locale-specific date and number formatting, consider using:

```tsx
// Date formatting example
const date = new Date();
const formatter = new Intl.DateTimeFormat(lng, { 
  dateStyle: 'full' 
});
const formattedDate = formatter.format(date);
```

### Advanced Translation Features

For more complex translation needs:

1. Consider integrating a full i18n library like `react-i18next` or `next-intl`
2. Implement pluralization and formatting rules
3. Add support for translation contexts and namespaces

### RTL Support

For right-to-left language support:

1. Add direction attributes to the layout component
2. Include RTL-specific CSS using the `dir` attribute
3. Test thoroughly with RTL languages

## Troubleshooting

### Hydration Errors

If you encounter hydration errors:

1. Ensure the `<html>` lang attribute is set consistently
2. Use the `suppressHydrationWarning` attribute where needed
3. Avoid mixing server and client rendering for language-dependent components

### Redirect Loops

If you experience redirect loops:

1. Check the matcher configuration in middleware
2. Ensure static assets are properly excluded from localization
3. Verify that the middleware correctly detects existing locale prefixes

## Conclusion

The internationalization implementation in our application provides a robust foundation for multilingual support. By following these best practices and guidelines, you can maintain, extend, and optimize the i18n functionality as the application grows. 