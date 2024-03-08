import hasPage from '../../../../registry/has-page.ts';
import getSlugFromUrl from '../../../../utils/get-slug-from-url.ts';
import type { AstroFile } from '../../../validate-astro-file.ts';

import labels from './labels.ts';

export default function guidesSections(file: AstroFile) {
  const targetLocale = process.env.TARGET_LOCALE;
  const currentPath = `/${targetLocale}/docs/${file.data.astro.frontmatter.slug}`;
  const webCssURL = `/${targetLocale}/docs/Web/CSS/`;

  const animationsSections = [
    {
      path: `${webCssURL}CSS_animations/Using_CSS_animations`,
      title: labels['Using CSS animations'],
    },
  ];

  const backgroundsAndBorders = [
    {
      path: `${webCssURL}CSS_backgrounds_and_borders/Using_multiple_backgrounds`,
      title: labels['Using multiple backgrounds'],
    },
    {
      path: `${webCssURL}CSS_backgrounds_and_borders/Resizing_background_images`,
      title: labels['Resizing background images'],
    },
  ];

  const boxAlignment = [
    {
      path: `${webCssURL}CSS_box_alignment/Box_Alignment_In_Block_Abspos_Tables`,
      title: labels['Box alignment in block layout'],
    },
    {
      path: `${webCssURL}CSS_box_alignment/Box_Alignment_in_Flexbox`,
      title: labels['Box alignment in flexbox'],
    },
    {
      path: `${webCssURL}CSS_box_alignment/Box_Alignment_In_Grid_Layout`,
      title: labels['Box alignment in grid layout'],
    },
    {
      path: `${webCssURL}CSS_box_alignment/Box_Alignment_in_Multi-column_Layout`,
      title: labels['Box alignment in multi-column layout'],
    },
  ];

  const boxModel = [
    {
      path: `${webCssURL}CSS_box_model/Introduction_to_the_CSS_box_model`,
      title: labels['Introduction to the CSS basic box model'],
    },
    {
      path: `${webCssURL}CSS_box_model/Mastering_margin_collapsing`,
      title: labels['Mastering margin collapsing'],
    },
  ];

  const colors = [
    {
      path: `${webCssURL}CSS_colors/Applying_color`,
      title: labels.Applying_color_to_HTML_elements_using_CSS,
    },
    // Accessibility is out of scope of our current work atm
    // {
    //   path: `${accessibilityURL}Understanding_Colors_and_Luminance`,
    //   title: labels.Web_Accessibility_Understanding_Colors_and_Luminance,
    // },
    // {
    //   path: `${accessibilityURL}Understanding_WCAG/Perceivable/Color_contrast`,
    //   title: labels.Color_contrast,
    // },
  ];

  const columns = [
    {
      path: `${webCssURL}CSS_multicol_layout/Basic_concepts`,
      title: labels['Basic concepts of Multicol'],
    },
    {
      path: `${webCssURL}CSS_Multicol_Layout/Styling_columns`,
      title: labels['Styling columns'],
    },
    {
      path: `${webCssURL}CSS_Multicol_Layout/Spanning_balancing_columns`,
      title: labels['Spanning and balancing'],
    },
    {
      path: `${webCssURL}CSS_Multicol_Layout/Handling_overflow_in_multicol_layout`,
      title: labels['Handling overflow in Multicol'],
    },
    {
      path: `${webCssURL}CSS_Multicol_Layout/Handling_content_breaks_in_multicol_layout`,
      title: labels['Content breaks in Multicol'],
    },
  ];

  const conditionalRules = [
    {
      path: `${webCssURL}CSS_Conditional_Rules/Using_Feature_Queries`,
      title: labels.Using_feature_queries,
    },
  ];

  const cssomView = [
    {
      path: `${webCssURL}CSSOM_View/Coordinate_systems`,
      title: labels['Coordinate systems'],
    },
  ];

  const flexbox = [
    {
      path: `${webCssURL}CSS_flexible_box_layout/Basic_concepts_of_flexbox`,
      title: labels['Basic concepts of Flexbox'],
    },
    {
      path: `${webCssURL}CSS_flexible_box_layout/Relationship_of_flexbox_to_other_layout_methods`,
      title: labels['Comparison with other layout methods'],
    },
    {
      path: `${webCssURL}CSS_flexible_box_layout/Aligning_items_in_a_flex_container`,
      title: labels['Aligning items in a flex container'],
    },
    {
      path: `${webCssURL}CSS_flexible_box_layout/Ordering_flex_items`,
      title: labels['Ordering flex items'],
    },
    {
      path: `${webCssURL}CSS_flexible_box_layout/Controlling_ratios_of_flex_items_along_the_main_axis`,
      title: labels['Controlling flex item ratios'],
    },
    {
      path: `${webCssURL}CSS_flexible_box_layout/Mastering_wrapping_of_flex_items`,
      title: labels['Mastering wrapping of flex items'],
    },
    {
      path: `${webCssURL}CSS_flexible_box_layout/Typical_use_cases_of_flexbox`,
      title: labels['Typical use cases of Flexbox'],
    },
    {
      path: `${webCssURL}CSS_flexible_box_layout/Backwards_compatibility_of_flexbox`,
      title: labels['Backwards compatibility of Flexbox'],
    },
  ];

  const flowLayout = [
    {
      path: `${webCssURL}CSS_flow_layout/Block_and_inline_layout_in_normal_flow`,
      title: labels['Block and Inline layout in normal flow'],
    },
    {
      path: `${webCssURL}CSS_flow_layout/In_flow_and_out_of_flow`,
      title: labels['In flow and Out of flow'],
    },
    {
      path: `${webCssURL}CSS_flow_layout/Introduction_to_formatting_contexts`,
      title: labels['Formatting contexts explained'],
    },
    {
      path: `${webCssURL}CSS_flow_layout/Flow_layout_and_writing_modes`,
      title: labels['Flow layout and writing modes'],
    },
    {
      path: `${webCssURL}CSS_flow_layout/Flow_layout_and_overflow`,
      title: labels['Flow layout and overflow'],
    },
  ];

  const fonts = [
    {
      path: `${webCssURL}CSS_fonts/OpenType_fonts_guide`,
      title: labels['OpenType font features guide'],
    },
    {
      path: `${webCssURL}CSS_fonts/Variable_fonts_guide`,
      title: labels['Variable fonts guide'],
    },
  ];

  const grid = [
    {
      path: `${webCssURL}CSS_grid_layout/Basic_concepts_of_grid_layout`,
      title: labels['Basics concepts of grid layout'],
    },
    {
      path: `${webCssURL}CSS_grid_layout/Relationship_of_grid_layout_with_other_layout_methods`,
      title: labels['Relationship to other layout methods'],
    },
    {
      path: `${webCssURL}CSS_grid_layout/Grid_layout_using_line-based_placement`,
      title: labels['Line-based placement'],
    },
    {
      path: `${webCssURL}CSS_grid_layout/Grid_template_areas`,
      title: labels['Grid template areas'],
    },
    {
      path: `${webCssURL}CSS_grid_layout/Grid_layout_using_named_grid_lines`,
      title: labels['Layout using named grid lines'],
    },
    {
      path: `${webCssURL}CSS_grid_layout/Auto-placement_in_grid_layout`,
      title: labels['Auto-placement in grid layout'],
    },
    {
      path: `${webCssURL}CSS_grid_layout/Box_alignment_in_grid_layout`,
      title: labels['Box alignment in grid layout'],
    },
    {
      path: `${webCssURL}CSS_grid_layout/Grids_logical_values_and_writing_modes`,
      title: labels['Grids, logical values and writing modes'],
    },
    {
      path: `${webCssURL}CSS_grid_layout/Grid_layout_and_accessibility`,
      title: labels['Grid layout and accessibility'],
    },
    {
      path: `${webCssURL}CSS_grid_layout/Grid_layout_and_progressive_enhancement`,
      title: labels['Grid Layout and progressive enhancement'],
    },
    {
      path: `${webCssURL}CSS_grid_layout/Realizing_common_layouts_using_grids`,
      title: labels['Realizing common layouts using grids'],
    },
    {
      path: `${webCssURL}CSS_grid_layout/Subgrid`,
      title: labels.Subgrid,
    },
    {
      path: `${webCssURL}CSS_grid_layout/Masonry_layout`,
      title: labels['Masonry layout'],
    },
  ];

  const images = [
    {
      path: `${webCssURL}CSS_images/Using_CSS_gradients`,
      title: labels['Using CSS gradients'],
    },
  ];

  const listsAndCounters = [
    {
      path: `${webCssURL}CSS_counter_styles/Using_CSS_counters`,
      title: labels['Using CSS counters'],
    },
    {
      path: `${webCssURL}CSS_lists/Consistent_list_indentation`,
      title: labels['Consistent list indentation'],
    },
  ];

  const logicalProperties = [
    {
      path: `${webCssURL}CSS_logical_properties_and_values/Basic_concepts_of_logical_properties_and_values`,
      title: labels['Basic concepts'],
    },
    {
      path: `${webCssURL}CSS_logical_properties_and_values/Floating_and_positioning`,
      title: labels['Floating and positioning'],
    },
    {
      path: `${webCssURL}CSS_logical_properties_and_values/Margins_borders_padding`,
      title: labels['Margins, borders and padding'],
    },
    {
      path: `${webCssURL}CSS_logical_properties_and_values/Sizing`,
      title: labels.Sizing,
    },
  ];

  const mediaQueries = [
    {
      path: `${webCssURL}CSS_media_queries/Using_media_queries`,
      title: labels['Using media queries'],
    },
    {
      path: `${webCssURL}CSS_media_queries/Using_media_queries_for_accessibility`,
      title: labels['Using media queries for accessibility'],
    },
    {
      path: `${webCssURL}CSS_media_queries/Testing_media_queries`,
      title: labels['Testing media queries programmatically'],
    },
  ];

  const nesting = [
    {
      path: `${webCssURL}CSS_Nesting/Using_CSS_nesting`,
      title: labels.Using_CSS_nesting,
    },
    {
      path: `${webCssURL}CSS_Nesting/Nesting_at-rules`,
      title: labels['Nesting_at-rules'],
    },
    {
      path: `${webCssURL}CSS_Nesting/Nesting_and_specificity`,
      title: labels.Nesting_and_specificity,
    },
  ];

  const positioning = [
    {
      path: `${webCssURL}CSS_positioned_layout/Understanding_z-index`,
      title: labels['Understanding CSS z-index'],
    },
  ];

  const scrollSnap = [
    {
      path: `${webCssURL}CSS_scroll_snap/Basic_concepts`,
      title: labels['Basic concepts of scroll snap'],
    },
  ];

  const shapes = [
    {
      path: `${webCssURL}CSS_shapes/Overview_of_shapes`,
      title: labels['Overview of shapes'],
    },
    {
      path: `${webCssURL}CSS_shapes/From_box_values`,
      title: labels['Shapes from box values'],
    },
    {
      path: `${webCssURL}CSS_shapes/Basic_shapes`,
      title: labels['Basic shapes'],
    },
    {
      path: `${webCssURL}CSS_shapes/Shapes_from_images`,
      title: labels['Shapes from images'],
    },
  ];

  const text = [
    {
      path: `${webCssURL}CSS_text/Wrapping_breaking_text`,
      title: labels['Wrapping and breaking text'],
    },
  ];

  const transforms = [
    {
      path: `${webCssURL}CSS_transforms/Using_CSS_transforms`,
      title: labels['Using transforms'],
    },
  ];

  const transitions = [
    {
      path: `${webCssURL}CSS_transitions/Using_CSS_transitions`,
      title: labels['Using transitions'],
    },
  ];

  const pageToNavItem = ({ path, title }: { path: string; title: string }) => {
    const slug = getSlugFromUrl(path);
    return {
      hasTranslation: hasPage(slug),
      isCurrent: path === currentPath,
      slug,
      title,
      path,
    };
  };

  return [
    {
      title: labels.Animations,
      items: animationsSections.map((item) => pageToNavItem(item)),
      expanded: animationsSections.some(({ path }) => path === currentPath),
    },
    {
      title: labels['Backgrounds and Borders'],
      items: backgroundsAndBorders.map((item) => pageToNavItem(item)),
      expanded: backgroundsAndBorders.some(({ path }) => path === currentPath),
    },
    {
      title: labels['Box alignment'],
      items: boxAlignment.map((item) => pageToNavItem(item)),
      expanded: boxAlignment.some(({ path }) => path === currentPath),
    },
    {
      title: labels['Box model'],
      items: boxModel.map((item) => pageToNavItem(item)),
      expanded: boxModel.some(({ path }) => path === currentPath),
    },
    {
      title: labels.Colors,
      items: colors.map((item) => pageToNavItem(item)),
      expanded: colors.some(({ path }) => path === currentPath),
    },
    {
      title: labels.Columns,
      items: columns.map((item) => pageToNavItem(item)),
      expanded: columns.some(({ path }) => path === currentPath),
    },
    {
      title: labels.Conditional_rules,
      items: conditionalRules.map((item) => pageToNavItem(item)),
      expanded: conditionalRules.some(({ path }) => path === currentPath),
    },
    {
      title: labels['CSSOM view'],
      items: cssomView.map((item) => pageToNavItem(item)),
      expanded: cssomView.some(({ path }) => path === currentPath),
    },
    {
      title: labels.Flexbox,
      items: flexbox.map((item) => pageToNavItem(item)),
      expanded: flexbox.some(({ path }) => path === currentPath),
    },
    {
      title: labels['Flow layout'],
      items: flowLayout.map((item) => pageToNavItem(item)),
      expanded: flowLayout.some(({ path }) => path === currentPath),
    },
    {
      title: labels.Fonts,
      items: fonts.map((item) => pageToNavItem(item)),
      expanded: fonts.some(({ path }) => path === currentPath),
    },
    {
      title: labels.Grid,
      items: grid.map((item) => pageToNavItem(item)),
      expanded: grid.some(({ path }) => path === currentPath),
    },
    {
      title: labels.Images,
      items: images.map((item) => pageToNavItem(item)),
      expanded: images.some(({ path }) => path === currentPath),
    },
    {
      title: labels['Lists and counters'],
      items: listsAndCounters.map((item) => pageToNavItem(item)),
      expanded: listsAndCounters.some(({ path }) => path === currentPath),
    },
    {
      title: labels['Logical properties'],
      items: logicalProperties.map((item) => pageToNavItem(item)),
      expanded: logicalProperties.some(({ path }) => path === currentPath),
    },
    {
      title: labels['Media queries'],
      items: mediaQueries.map((item) => pageToNavItem(item)),
      expanded: mediaQueries.some(({ path }) => path === currentPath),
    },
    {
      title: labels.Nesting,
      items: nesting.map((item) => pageToNavItem(item)),
      expanded: nesting.some(({ path }) => path === currentPath),
    },
    {
      title: labels.Positioning,
      items: positioning.map((item) => pageToNavItem(item)),
      expanded: positioning.some(({ path }) => path === currentPath),
    },
    {
      title: labels['Scroll snap'],
      items: scrollSnap.map((item) => pageToNavItem(item)),
      expanded: scrollSnap.some(({ path }) => path === currentPath),
    },
    {
      title: labels.Shapes,
      items: shapes.map((item) => pageToNavItem(item)),
      expanded: shapes.some(({ path }) => path === currentPath),
    },
    {
      title: labels.Text,
      items: text.map((item) => pageToNavItem(item)),
      expanded: text.some(({ path }) => path === currentPath),
    },
    {
      title: labels.Transforms,
      items: transforms.map((item) => pageToNavItem(item)),
      expanded: transforms.some(({ path }) => path === currentPath),
    },
    {
      title: labels.Transitions,
      items: transitions.map((item) => pageToNavItem(item)),
      expanded: transitions.some(({ path }) => path === currentPath),
    },
  ]
    .map(({ items, ...rest }) => ({
      ...rest,
      items: items.filter(({ hasTranslation }) => hasTranslation),
    }))
    .filter(({ items }) => items.length > 0)
    .sort((a, b) => a.title.localeCompare(b.title));
}
