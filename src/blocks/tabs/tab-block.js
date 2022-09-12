import { Tab, Tabs as TabsComponent, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
	store as blockEditorStore,
	InnerBlocks,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';

const TabBlock = ({ 
  data,
  clientId,
  renderer 
}) => {
  
  
  const MY_TEMPLATE = [
		[ 'grigora-kit/inner-tab', {} ],
		
		
		];

	  const { hasInnerBlocks, themeSupportsLayout } = useSelect(
		( select ) => {
			const { getBlock, getSettings } = select( blockEditorStore );
			const block = getBlock( clientId );
			return {
				hasInnerBlocks: !! ( block && block.innerBlocks.length ),
				themeSupportsLayout: getSettings()?.supportsLayout,
			};
		},
		[ clientId ]
	);

	const ALLOWED_BLOCKS = [
		'grigora-kit/inner-tab',
	]
  
  
  
  return(
  <div>

      <TabsComponent>
        <TabList className="tabs-header">
          {data.map(({ heading }, i) => (
            <Tab key={i} className="general">{heading}</Tab>
          ))}
        </TabList>
        {data.map(({ body }, i) => (
          <TabPanel key={i}>{body}</TabPanel>
        ))}
      </TabsComponent>

      
				<div style={{border: '10px solid black'}}>
          12345
        <InnerBlocks
        renderAppender={
          hasInnerBlocks
            ? undefined
            : InnerBlocks.ButtonBlockAppender
        }
        allowedBlocks={ ALLOWED_BLOCKS }
        template={ MY_TEMPLATE }
        // templateLock="all"
        />
    
        
        </div>

  </div>
)};

export default TabBlock;