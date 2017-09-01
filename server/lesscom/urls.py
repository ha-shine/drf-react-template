from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken import views as authviews
from . import views

app_name = 'lesscom'
urlpatterns = [
    url(r'^users/$', views.UserCreateView.as_view(), name='create_user'),
    url(r'^auth/$', authviews.obtain_auth_token, name='authenticate')
]

urlpatterns = format_suffix_patterns(urlpatterns)