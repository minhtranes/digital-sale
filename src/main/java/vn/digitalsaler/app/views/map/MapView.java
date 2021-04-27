package vn.digitalsaler.app.views.map;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

import vn.digitalsaler.app.components.leafletmap.LeafletMap;
import vn.digitalsaler.app.views.main.MainView;

import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.component.dependency.CssImport;

@Route(value = "map", layout = MainView.class)
@PageTitle("Map")
@CssImport("./views/map/map-view.css")
public class MapView extends VerticalLayout {

    private LeafletMap map = new LeafletMap();

    public MapView() {
        setSizeFull();
        setPadding(false);
        map.setSizeFull();
        map.setView(55.0, 10.0, 4);
        add(map);
    }
}
