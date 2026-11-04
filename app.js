const views={
 main:{file:'tv-showcase-main.png',title:'完整工作區',description:'主要圖表集中在中央，左側繪圖、右側面板、下方 Delta／CVD，保留更多看盤空間。'},
 tools:{file:'tv-drawing-toolbar.png',title:'繪圖工具列',description:'展開式工具列顯示工具名稱與方案標記，包含趨勢線、水平線、垂直線、射線、矩形、Fib 與文字。'},
 popout:{file:'tv-popout.png',title:'分離面板',description:'桌面版可把訂單流面板移到獨立視窗，也可以停靠回主工作區；適合多螢幕使用。'},
 free:{file:'tv-free-locked.png',title:'Free 方案',description:'Free 方案讓鎖定功能保持可見，趨勢線與水平線最多 5 個；此圖同樣是合成資料展示。'}
};
const image=document.querySelector('#preview-image'),zoomImage=document.querySelector('#zoom-image'),dialog=document.querySelector('#zoom');
function selectView(key){
 const view=views[key]??views.main;
 image.src='images/'+view.file;image.alt=view.title+'，合成資料版型預覽';
 zoomImage.src=image.src;zoomImage.alt=image.alt;
 document.querySelector('#view-title').textContent=view.title;
 document.querySelector('#view-description').textContent=view.description;
 document.querySelectorAll('[data-view]').forEach(button=>button.setAttribute('aria-pressed',String(views[button.dataset.view]===view)));
}
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{selectView(button.dataset.view);history.replaceState(null,'','#'+button.dataset.view)}));
const expand=()=>dialog.showModal();
document.querySelector('#expand').addEventListener('click',expand);
document.querySelector('#image-button').addEventListener('click',expand);
document.querySelector('#close-zoom').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
window.addEventListener('hashchange',()=>selectView(location.hash.slice(1)));
selectView(location.hash.slice(1));
