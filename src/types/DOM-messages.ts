export type TDOMMessageType = 
'getInnerText' | 'getImageUrl' | 'toggle'


export interface IDOMMessage {
    msg: TDOMMessageType;
  }
