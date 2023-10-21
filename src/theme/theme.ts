import type { ThemeConfig } from 'antd';
import {theme as antdTheme} from 'antd'

const theme: ThemeConfig = {
  components:{
    Menu:{
      itemSelectedBg:"#7A4BFF1A",
      itemBorderRadius:12,
      itemMarginInline:14,
      itemMarginBlock:10,
    },
    DatePicker:{
      colorBgContainer:"#ffffff",
      colorBorder:"#e9e9ed",
      colorPrimary:"#8b62ff",
      colorPrimaryHover:"#8b62ff",
      controlHeight:40,
      borderRadius:6,
    },
    Select:{
      colorBgContainer:"#ffffff",
      colorBorder:"#e9e9ed",
      colorPrimary:"#8b62ff",
      colorPrimaryHover:"#8b62ff",
      controlHeight:40,
      borderRadius:6,
    },
    Button:{
      colorBgContainer:"#ffffff",
      colorBorder:"#e9e9ed",
      colorPrimary:"#8b62ff",
      colorPrimaryHover:"#8b62ff",
      controlHeight:40,
      borderRadius:6,
    },
    Tabs:{
      itemSelectedColor:"#8b62ff",
      inkBarColor:"#8b62ff",
      itemHoverColor:"gray"
    },
    Radio:{
      buttonCheckedBg:"#E9E9ED",
      colorPrimary:"#7a4bff"
    },
    Switch:{
      colorPrimary:"#01EA85"
    }
  },
  // algorithm:antdTheme.compactAlgorithm
};

export default theme;