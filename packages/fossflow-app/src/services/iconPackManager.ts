import { useState, useEffect, useCallback } from 'react';

// Available icon packs (restricted to aws only)
export type IconPackName = 'aws';

export interface IconPackInfo {
  name: IconPackName;
  displayName: string;
  loaded: boolean;
  loading: boolean;
  error: string | null;
  iconCount: number;
}

export interface IconPackManagerState {
  lazyLoadingEnabled: boolean;
  enabledPacks: IconPackName[];
  packInfo: Record<IconPackName, IconPackInfo>;
  loadedIcons: any[];
}

// localStorage keys
const LAZY_LOADING_KEY = 'fossflow-lazy-loading-enabled';
const ENABLED_PACKS_KEY = 'fossflow-enabled-icon-packs';

// Pack metadata
const PACK_METADATA: Record<IconPackName, string> = {
  aws: 'AWS Icons'
};

// Load preferences from localStorage
export const loadLazyLoadingPreference = (): boolean => {
  const stored = localStorage.getItem(LAZY_LOADING_KEY);
  return stored === null ? true : stored === 'true'; // Default to true
};

export const saveLazyLoadingPreference = (enabled: boolean): void => {
  localStorage.setItem(LAZY_LOADING_KEY, String(enabled));
};

export const loadEnabledPacks = (): IconPackName[] => {
  return ['aws'];
};

export const saveEnabledPacks = (packs: IconPackName[]): void => {
  // No-op, we force AWS
};

// Helper to organize icons by category while maintaining flat structure for Isoflow
const organizeIconsByCategory = (pack: any): any => {
  if (!pack || !pack.icons) return pack;
  
  // Group icons by collection (category)
  const categorizedIcons: Record<string, any[]> = {};
  
  pack.icons.forEach((icon: any) => {
    const category = icon.collection || 'General';
    if (!categorizedIcons[category]) {
      categorizedIcons[category] = [];
    }
    categorizedIcons[category].push(icon);
  });
  
  // Create a collection structure that Isoflow can understand
  // Each category becomes a separate collection
  const collections = Object.entries(categorizedIcons).map(([categoryName, icons]) => ({
    name: categoryName,
    title: categoryName,
    icons: icons
  }));
  
  return {
    ...pack,
    collections: collections,
    icons: pack.icons // Keep flat icons array for compatibility
  };
};

// Dynamic pack loader
export const loadIconPack = async (packName: IconPackName): Promise<any> => {
  console.log(`Attempting to load icon pack: ${packName}`);
  switch (packName) {
    case 'aws':
      const awsPack = (await import('../generatedAwsIcons')).generatedAwsIcons;
      // Fix icon URLs to include PUBLIC_URL for GitHub Pages deployment
      const publicUrl = process.env.PUBLIC_URL || '';
      const fixedAwsPack = {
        ...awsPack,
        icons: awsPack.icons.map((icon: any) => ({
          ...icon,
          url: icon.url.startsWith('/') ? `${publicUrl}${icon.url}` : icon.url
        }))
      };
      return organizeIconsByCategory(fixedAwsPack);
    default:
      throw new Error(`Unknown icon pack: ${packName}`);
  }
};

// React hook for managing icon packs
export const useIconPackManager = (coreIcons: any[]) => {
  const [lazyLoadingEnabled, setLazyLoadingEnabled] = useState<boolean>(() =>
    loadLazyLoadingPreference()
  );

  const [enabledPacks, setEnabledPacks] = useState<IconPackName[]>(() =>
    loadEnabledPacks()
  );

  const [packInfo, setPackInfo] = useState<Record<IconPackName, IconPackInfo>>(() => {
    const info: Record<string, IconPackInfo> = {};
    const packNames: IconPackName[] = ['aws'];
    packNames.forEach(name => {
      info[name] = {
        name,
        displayName: PACK_METADATA[name],
        loaded: false,
        loading: false,
        error: null,
        iconCount: 0
      };
    });
    return info as Record<IconPackName, IconPackInfo>;
  });

  const [loadedIcons, setLoadedIcons] = useState<any[]>(coreIcons);
  const [loadedPackData, setLoadedPackData] = useState<Record<IconPackName, any>>({} as Record<IconPackName, any>);

  // Load a specific pack
  const loadPack = useCallback(async (packName: IconPackName) => {
    // Already loaded?
    if (packInfo[packName].loaded || packInfo[packName].loading) {
      return;
    }

    // Set loading state
    setPackInfo(prev => ({
      ...prev,
      [packName]: { ...prev[packName], loading: true, error: null }
    }));

    try {
      const pack = await loadIconPack(packName);
      // Use the icons directly from the pack (already organized by category)
      const packIcons = pack.icons || [];

      // Store the loaded pack data
      setLoadedPackData(prev => ({
        ...prev,
        [packName]: pack
      }));

      // Update pack info
      setPackInfo(prev => ({
        ...prev,
        [packName]: {
          ...prev[packName],
          loaded: true,
          loading: false,
          iconCount: packIcons.length,
          error: null
        }
      }));

      // Add icons to the loaded icons array (avoid duplicates)
      setLoadedIcons(prev => {
        const existingIds = new Set(prev.map(icon => icon.id));
        const newIcons = packIcons.filter((icon: any) => !existingIds.has(icon.id));
        return [...prev, ...newIcons];
      });

      return packIcons;
    } catch (error) {
      console.error(`Failed to load ${packName} icon pack:`, error);
      setPackInfo(prev => ({
        ...prev,
        [packName]: {
          ...prev[packName],
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to load pack'
        }
      }));
      throw error;
    }
  }, [packInfo]);

  // Enable/disable a pack
  const togglePack = useCallback(async (packName: IconPackName, enabled: boolean) => {
    if (enabled) {
      // Add to enabled packs
      const newEnabledPacks = [...enabledPacks, packName];
      setEnabledPacks(newEnabledPacks);
      saveEnabledPacks(newEnabledPacks);

      // Load the pack
      await loadPack(packName);
    } else {
      // Remove from enabled packs
      const newEnabledPacks = enabledPacks.filter(p => p !== packName);
      setEnabledPacks(newEnabledPacks);
      saveEnabledPacks(newEnabledPacks);

      // Remove icons from loaded icons
      // We need to rebuild the icons array from core + enabled packs
      const newIcons = [coreIcons];
      for (const pack of newEnabledPacks) {
        if (loadedPackData[pack]) {
          const packIcons = loadedPackData[pack].icons || [];
          newIcons.push(packIcons);
        }
      }
      setLoadedIcons(newIcons.flat());
    }
  }, [enabledPacks, loadPack, coreIcons, loadedPackData]);

  // Toggle lazy loading
  const toggleLazyLoading = useCallback((enabled: boolean) => {
    setLazyLoadingEnabled(enabled);
    saveLazyLoadingPreference(enabled);
  }, []);

  const loadAllPacks = useCallback(async () => {
    const allPacks: IconPackName[] = ['aws'];
    for (const pack of allPacks) {
      if (!packInfo[pack].loaded && !packInfo[pack].loading) {
        await loadPack(pack);
      }
    }
  }, [packInfo, loadPack]);

  // Auto-detect required packs from diagram data
  const loadPacksForDiagram = useCallback(async (diagramItems: any[]) => {
    if (!diagramItems || diagramItems.length === 0) return;

    // Extract unique collections from diagram items
    const collections = new Set<string>();
    diagramItems.forEach(item => {
      if (item.icon?.collection) {
        collections.add(item.icon.collection);
      }
    });

    // Load any missing packs
    const packsToLoad: IconPackName[] = [];
    collections.forEach(collection => {
      if (collection !== 'isoflow' && collection !== 'imported') {
        const packName = collection as IconPackName;
        if (['aws'].includes(packName)) {
          if (!packInfo[packName].loaded && !packInfo[packName].loading) {
            packsToLoad.push(packName);
          }
        }
      }
    });

    // Load required packs
    for (const pack of packsToLoad) {
      await loadPack(pack);
      // Also add to enabled packs
      if (!enabledPacks.includes(pack)) {
        const newEnabledPacks = [...enabledPacks, pack];
        setEnabledPacks(newEnabledPacks);
        saveEnabledPacks(newEnabledPacks);
      }
    }
  }, [packInfo, enabledPacks, loadPack]);

  // Initialize: Load enabled packs or all packs depending on lazy loading setting
  useEffect(() => {
    const initialize = async () => {
      if (!lazyLoadingEnabled) {
        // Load all packs immediately
        await loadAllPacks();
      } else {
        // Load only enabled packs
        for (const pack of enabledPacks) {
          if (!packInfo[pack].loaded && !packInfo[pack].loading) {
            await loadPack(pack);
          }
        }
      }
    };
    initialize();
  }, []); // Only run once on mount

  return {
    lazyLoadingEnabled,
    enabledPacks,
    packInfo,
    loadedIcons,
    togglePack,
    toggleLazyLoading,
    loadAllPacks,
    loadPacksForDiagram,
    isPackEnabled: (packName: IconPackName) => enabledPacks.includes(packName)
  };
};
